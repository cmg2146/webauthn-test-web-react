import {
  EllipsisHorizontalIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  CpuChipIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { Menu } from '@headlessui/react';

import UserCredentialModel from "@/scripts/models/passkeys/UserCredentialModel";
import { useActivePasskey } from '@/scripts/authHelpers';

export default function UserPasskeyItem({
  passkey,
  onDelete,
  className = ""
}: {
  passkey: UserCredentialModel,
  onDelete: (credential: UserCredentialModel) => void,
  className?: string
}) {
  const activePasskeyInfo = useActivePasskey();

  function getPasskeyIcon(passkey: UserCredentialModel) {
    const attFmt = passkey.attestationFormatId;

    if (attFmt === 'tpm') {
      return <ComputerDesktopIcon className="w-6 h-6" />;
    } else if (
      attFmt === 'android-key' ||
      attFmt === 'android-safetynet' ||
      attFmt === 'apple'
    ) {
      return <DevicePhoneMobileIcon className="w-6 h-6" />;
    }

    return <CpuChipIcon className="w-6 h-6" />;
  }

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex flex-col items-start space-y-2">
        <div className="flex items-center space-x-2">
          {getPasskeyIcon(passkey)}
          <div className="flex-grow">{passkey.displayName}</div>
        </div>
        {activePasskeyInfo.passkey?.id === passkey.id &&
          <div className="rounded-full p-2 bg-blue-400">Logged In</div>
        }
        <div className="text-sm font-light">Added {passkey.createdAt.toLocaleDateString()}</div>
      </div>

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
  );
}
