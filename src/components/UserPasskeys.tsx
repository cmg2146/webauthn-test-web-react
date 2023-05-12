import useSWR from "swr";
import axios from "axios";
import { PlusIcon } from '@heroicons/react/24/outline'
import { MouseEvent, useState } from "react";

import UserPasskeyItem from "./UserPasskeyItem";
import ConfirmDeletePasskeyDialog from "./ConfirmDeletePasskeyDialog";
import Spinner from "./Spinner";
import UserCredentialModel from "@/scripts/models/passkeys/UserCredentialModel";
import { doRegisterCredentialCeremony } from "@/scripts/webAuthnHelpers";

export default function UserPasskeys({
  className = ""
}: {
  className?: string
}) {
  const {data, error, isLoading, mutate} = useSWR(
    "/api/users/me/credentials",
    (url) => axios.get<UserCredentialModel[]>(url).then((res) => res.data));

  const [isAddingPasskey, setIsAddingPasskey] = useState(false);
  const [errorAddingPasskey, setErrorAddingPasskey] = useState("");
  const [deletingPasskey, setDeletingPasskey] = useState<UserCredentialModel | undefined | null>(null);

  function addPasskey(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsAddingPasskey(true);
    setErrorAddingPasskey("");

    return doRegisterCredentialCeremony()
      .then((response) => {
        mutate();
      })
      .catch(err => {
        setErrorAddingPasskey(err.message);
      })
      .finally(() => {
        setIsAddingPasskey(false);
      });
  }

  function onPasskeyDeleted(passkey: UserCredentialModel) {
    // TODO: remove the passkey from the data instead of doing a reload, if possible
    setDeletingPasskey(null);
    mutate();
  }

  let passkeyContent;
  if (isLoading) {
    passkeyContent = (
      <span className="flex items-center self-center font-semibold py-5 px-10">
        <Spinner className="mr-3 h-4 w-4"></Spinner>
        Loading your passkeys...
      </span>
    );
  } else if (error) {
    passkeyContent = (
      <span className="self-center font-semibold py-5 px-10">There was an issue loading your passkeys.</span>
    );
  } else if (!data?.length) {
    passkeyContent = (
      <span className="self-center font-semibold py-5 px-10">You don't have any passkeys registered yet.</span>
    );
  } else {
    passkeyContent = data.map((passkey) => (
      <UserPasskeyItem
        key={passkey.id.toString()}
        passkey={passkey}
        onDelete={(passkey) => setDeletingPasskey(passkey)}
        className="py-5 px-10"
      />
    ));
  }

  return (
    <>
      <div className={`flex flex-col justify-start items-stretch max-w-full divide-y ${className}`}>
        <div className="flex items-center justify-between py-5 px-10">
          <h1 className="text-2xl font-semibold">Passkeys</h1>
          <button
            className="btn-primary rounded-full self-end flex items-center font-semibold"
            onClick={addPasskey}
            disabled={isAddingPasskey}
          >
            <PlusIcon className="w-6 h-6 mr-2"></PlusIcon>
            <span>Passkey</span>
          </button>
        </div>
        <div className="flex flex-col divide-y">
          {passkeyContent}
        </div>
        <div className="flex flex-grow justify-center items-center p-10">
          <p className="md:max-w-2xl font-light">
            A passkey is a credential stored on one of your devices and is used for logging in. A passkey
            consists of a public/private keypair and the private key never leaves your device.
          </p>
        </div>
      </div>

      {deletingPasskey &&
        <ConfirmDeletePasskeyDialog
          passkey={deletingPasskey}
          isOpen={true}
          onDeleted={(passkey) => onPasskeyDeleted(passkey)}
          onClose={() => setDeletingPasskey(null)}
          onCancel={() => setDeletingPasskey(null)}
        ></ConfirmDeletePasskeyDialog>
      }
    </>
  );
}
