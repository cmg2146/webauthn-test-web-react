import { Dialog } from "@headlessui/react";
import axios from "axios";
import { useState } from "react";
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

import UserCredentialModel from "@/scripts/models/passkeys/UserCredentialModel";
import Spinner from "../controls/Spinner";
import Backdrop from "../controls/Backdrop";

export default function ConfirmDeletePasskeyDialog({
  passkey,
  isOpen,
  onClose = () => {},
  onConfirm = () => {},
  onCancel = () => {},
  onDeleted = () => {},
  onDeletedError = () => {},
}: {
  passkey: UserCredentialModel,
  isOpen: boolean,
  onClose?: (passkey: UserCredentialModel) => void,
  onConfirm?: (passkey: UserCredentialModel) => void,
  onCancel?: (passkey: UserCredentialModel) => void,
  onDeleted?: (passkey: UserCredentialModel) => void,
  onDeletedError?: (passkey: UserCredentialModel) => void
}) {
  const [isDeletingPasskey, setIsDeletingPasskey] = useState(false);
  const [errorDeletingPasskey, setErrorDeletingPasskey] = useState("");

  function deletePasskey() {
    setIsDeletingPasskey(true);
    setErrorDeletingPasskey("");

    axios
      .delete(`/api/users/me/credentials/${passkey.id}`)
      .then(() => {
        onDeleted(passkey);
      })
      .catch((err) => {
        onDeletedError(passkey);
        setErrorDeletingPasskey(err.message);
      })
      .finally(() => {
        setIsDeletingPasskey(false);
      });
  }

  function confirmedDeletion() {
    onConfirm(passkey);
    deletePasskey();
  }

  // TODO: figure out transition
  return (
    <Dialog
      open={isOpen}
      className="fixed inset-0 z-10 overflow-y-auto flex min-h-full items-center justify-center p-4 text-center sm:p-0"
      onClose={() => onClose(passkey)}
    >
      <Backdrop />
      <Dialog.Panel className="relative transform overflow-hidden p-6 rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div className="flex items-start mb-5">
          <div className="rounded-full p-2 mr-5 bg-red-200">
            <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <Dialog.Title className="text-lg font-semibold mb-3">Delete Passkey</Dialog.Title>
            <Dialog.Description className="text-sm text-gray-500 mb-4">
              Are you sure you want to delete this passkey?
            </Dialog.Description>

            {errorDeletingPasskey &&
              <p className="text-red-600">There was an issue deleting the passkey: {errorDeletingPasskey}</p>
            }
          </div>
        </div>
        <div className="flex items-center justify-end">
          <button className="btn-plain" onClick={() => onCancel(passkey)}>
            Cancel
          </button>
          <button className="btn-danger ml-3" disabled={isDeletingPasskey} onClick={() => confirmedDeletion()}>
            {isDeletingPasskey && <Spinner className="mr-2 h-4 w-4"></Spinner>}
            Delete
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
