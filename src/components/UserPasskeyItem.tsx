import {
  EllipsisHorizontalIcon,
  KeyIcon,
  DevicePhoneMobileIcon,
  CpuChipIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { Menu } from '@headlessui/react';
import moment from "moment";

import UserCredentialModel from "@/scripts/models/passkeys/UserCredentialModel";
import { useCurrentPasskey } from '@/scripts/authHelpers';

export default function UserPasskeyItem({
  passkey,
  onDelete,
  className = ""
}: {
  passkey: UserCredentialModel,
  onDelete: (credential: UserCredentialModel) => void,
  className?: string
}) {
  const activePasskeyInfo = useCurrentPasskey();

  function getPasskeyIcon(passkey: UserCredentialModel) {
    const attFmt = passkey.attestationFormatId;

    if (attFmt === 'tpm') {
      return <CpuChipIcon className="w-6 h-6" />;
    } else if (
      attFmt === 'android-key' ||
      attFmt === 'android-safetynet' ||
      attFmt === 'apple'
    ) {
      return <DevicePhoneMobileIcon className="w-6 h-6" />;
    }

    return <KeyIcon className="w-6 h-6" />;
  }

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex flex-col items-start space-y-2">
        <div className="flex items-center space-x-2">
          {getPasskeyIcon(passkey)}
          <div>{passkey.displayName}</div>
        </div>
        <div className="text-sm font-light">
          Added {moment(passkey.created).toDate().toLocaleDateString()}
        </div>
      </div>

      <div className="flex items-center">
        {activePasskeyInfo.passkey?.id === passkey.id &&
          <div className="hidden md:flex items-center mr-4">
            <div className="rounded-full h-3 w-3 bg-green-400 mr-2"></div>
            <span className="text-sm font-semibold">Logged In</span>
          </div>
        }
        <Menu as="div" className="relative inline-block">
          <Menu.Button className="p-2 hover:bg-slate-50 rounded-full">
            <EllipsisHorizontalIcon className="w-6 h-6" />
          </Menu.Button>
          <Menu.Items
            as="div"
            className="menu-items-tr z-10 w-56 py-1 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <Menu.Item
              as="a"
              href="#"
              className="flex items-center px-3 py-2 hover:bg-gray-100 ui-active:bg-gray-100"
              onClick={() => onDelete(passkey)}
            >
              <TrashIcon className="w-6 h-6 mr-2 text-red-500" />
              <span>Delete</span>
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
    </div>
  );
}
