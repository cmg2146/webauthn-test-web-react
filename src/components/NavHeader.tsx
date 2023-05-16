import { useRouter } from "next/router";
import { Bars3Icon } from '@heroicons/react/24/outline'
import { Menu } from "@headlessui/react";

import { useCurrentUser, logout } from "@/scripts/authHelpers";

export default function NavHeader({
  title,
  onShowMenuClick
}: {
  title: string,
  onShowMenuClick: () => void
}) {
  const router = useRouter();
  const { user, mutateUser } = useCurrentUser();
  function onLogout() {
    logout().then(_ => {
      mutateUser();
      router.push('/login');
    });
  }

  return (
    <div className="flex justify-between bg-slate-50 border-b border-slate-200">
      <div className="flex">
        <button className="lg:hidden p-4 hover:bg-slate-200" onClick={onShowMenuClick}>
          <Bars3Icon className="w-6 h-6" />
        </button>
        <h2 className="flex items-center text-lg font-semibold px-4 lg:pl-10">{title}</h2>
      </div>
      {user && (
        <Menu as="div" className="relative block">
          <Menu.Button className="w-full p-4 hover:bg-slate-200 block font-semibold rounded">
            <div className="flex items-center">
              <div className="p-2 rounded-full border border-gray-800 text-sm text-gray-800">
                {user?.firstName.charAt(0).toLocaleUpperCase()}
                {user?.lastName.charAt(0).toLocaleUpperCase()}
              </div>
              <span className="hidden lg:inline ml-3">{user?.displayName}</span>
            </div>
          </Menu.Button>
          <Menu.Items
            as="div"
            className="menu-items-tr z-10 w-36 py-1 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <Menu.Item
              as="a"
              href="#"
              className="flex items-center px-3 py-2 hover:bg-gray-100 ui-active:bg-gray-100"
              onClick={() => onLogout()}
            >
              Logout
            </Menu.Item>
          </Menu.Items>
        </Menu>)
      }
    </div>
  );
}
