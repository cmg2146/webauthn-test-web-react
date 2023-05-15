import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu } from "@headlessui/react";
import { FingerPrintIcon, ArrowLeftCircleIcon } from '@heroicons/react/24/outline'

import { useCurrentUser, logout } from "@/scripts/authHelpers";

export default function NavSidebar({
  className
}: {
  className?: string
}) {
  const { user, mutateUser } = useCurrentUser();
  const router = useRouter();
  const currentRootRoute = router.pathname.split('/')[1];

  function getActiveBackgroundClass(route: string): string {
    return currentRootRoute.toLowerCase() === route ? 'bg-slate-200' : '';
  }

  function onLogout() {
    logout().then(_ => {
      mutateUser();
      router.push('/login');
    });
  }

  // TODO: Implement responsive, collapsible nav and header bar
  return (
    <nav className={`flex flex-col h-screen w-[300px] overflow-y-auto bg-slate-50 border-r border-slate-200 text-gray-800 ${className}`}>
      <Image src="webauthn-logo.svg" width="45" height="45" alt="Logo" className="mt-6 ml-6 mb-8"></Image>
      <div className="flex-grow space-y-1 font-semibold px-5">
        <Link
          href="/passkeys"
          className={`flex items-center p-3 rounded hover:bg-slate-200 no-underline ${getActiveBackgroundClass('passkeys')}`}
        >
          <FingerPrintIcon className="h-6 w-6 mr-3" />
          <span className="font-semibold">Passkeys</span>
        </Link>
      </div>
      {user && (
        <Menu as="div" className="relative block">
          <Menu.Button className="w-full hover:bg-slate-200 block font-semibold rounded px-4 py-2">
            <div className="flex items-center">
              <div className="mr-3 p-2 rounded-full border border-gray-800 text-sm text-gray-800">
                {user?.firstName.charAt(0).toLocaleUpperCase()}
                {user?.lastName.charAt(0).toLocaleUpperCase()}
              </div>
              <span>{user?.displayName}</span>
            </div>
          </Menu.Button>
          <Menu.Items
            as="div"
            className="menu-items-b z-10 mx-auto w-11/12 py-1 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <Menu.Item
              as="a"
              href="#"
              className="flex items-center px-3 py-2 hover:bg-gray-100 ui-active:bg-gray-100"
              onClick={() => onLogout()}
            >
              <ArrowLeftCircleIcon className="w-6 h-6 mr-2" />
              <span>Logout</span>
            </Menu.Item>
          </Menu.Items>
        </Menu>)
      }
    </nav>
  );
}
