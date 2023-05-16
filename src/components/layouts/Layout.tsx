import { ReactNode, useState } from "react";

import NavSidebar from "../NavSidebar";
import NavHeader from "../NavHeader";
import Backdrop from "../controls/Backdrop";

export default function Layout({
  children,
  headerTitle
} : {
  children: ReactNode,
  headerTitle: string
}) {
  // TODO: menuVisible should be set false any time screen is lg or larger to ensure
  // the menu auto hides every time the screen is sized down below the lg breakpoint. The menu is always
  // visible above the lg breakpoint.
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-row">
      <NavSidebar
        className={`w-[300px] shrink-0 h-screen max-lg:fixed z-10 ${menuVisible ? 'left-0' : 'max-lg:-left-[300px]'} overflow-y-auto transition-all duration-300`}
      ></NavSidebar>
      <div className="flex flex-col flex-grow overflow-y-auto">
        <NavHeader title={headerTitle} onShowMenuClick={() => setMenuVisible(true)}></NavHeader>
        {children}
      </div>
      <Backdrop
        className={`${menuVisible ? '' : 'pointer-events-none opacity-0'} lg:hidden transition-all duration-300`}
        onClick={() => setMenuVisible(false)}
      ></Backdrop>
    </div>
  );
}
