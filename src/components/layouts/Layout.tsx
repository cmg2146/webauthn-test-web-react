import { ReactNode } from "react";

import NavSidebar from "../NavSidebar";

export default function Layout({
  children
} : {
  children: ReactNode
}) {
  return (
    <div className="relative min-h-screen flex flex-row">
      <NavSidebar></NavSidebar>
      {children}
    </div>
  );
}
