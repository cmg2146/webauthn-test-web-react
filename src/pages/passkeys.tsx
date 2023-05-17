
import Head from "next/head";
import { PlusIcon } from '@heroicons/react/24/outline'
import { MouseEvent, useState } from "react";

import Layout from "@/components/layouts/Layout";
import RequireAuth from "@/components/RequireAuth";
import Spinner from "@/components/controls/Spinner";
import PasskeyItem from "@/components/passkeys/PasskeyItem";
import ConfirmDeletePasskeyDialog from "@/components/passkeys/ConfirmDeletePasskeyDialog";
import UserCredentialModel from "@/scripts/models/passkeys/UserCredentialModel";
import { doRegisterPasskeyCeremony, usePasskeys } from "@/scripts/authHelpers";

export default function Passkeys() {
  const { passkeys, isError, isLoading, mutate } = usePasskeys();
  const [isAddingPasskey, setIsAddingPasskey] = useState(false);
  const [errorAddingPasskey, setErrorAddingPasskey] = useState("");
  const [deletingPasskey, setDeletingPasskey] = useState<UserCredentialModel | undefined | null>(null);

  function addPasskey(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsAddingPasskey(true);
    setErrorAddingPasskey("");

    return doRegisterPasskeyCeremony()
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
  } else if (isError) {
    passkeyContent = (
      <span className="self-center font-semibold py-5 px-10">There was an issue loading your passkeys.</span>
    );
  } else if (!passkeys?.length) {
    passkeyContent = (
      <span className="self-center font-semibold py-5 px-10">You don't have any passkeys registered yet.</span>
    );
  } else {
    passkeyContent = passkeys.map((passkey) => (
      <PasskeyItem
        key={passkey.id.toString()}
        passkey={passkey}
        onDelete={(passkey) => setDeletingPasskey(passkey)}
        className="py-5 px-10"
      />
    ));
  }

  return (
    <RequireAuth>
      <Layout headerTitle="Passkeys">
        <Head><title>Passkeys</title></Head>
        <div className="flex-grow flex flex-col justify-start items-stretch divide-y bg-white">
          <div className="flex flex-col divide-y">
            {passkeyContent}
          </div>
          <div className="flex flex-col flex-grow justify-start items-center p-10">
            <button
              className="btn-primary rounded-full flex items-center font-semibold mb-8"
              onClick={addPasskey}
              disabled={isAddingPasskey}
            >
              <PlusIcon className="w-6 h-6 mr-2"></PlusIcon>
              <span>New Passkey</span>
            </button>
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
      </Layout>
    </RequireAuth>
  );
}
