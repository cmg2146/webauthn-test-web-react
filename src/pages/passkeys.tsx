import NavSidebar from "@/components/NavSidebar";

import UserPasskeys from "@/components/UserPasskeys";

export default function Passkeys() {
  return (
    <div className="relative min-h-screen flex flex-row">
      <NavSidebar className="hidden md:block"></NavSidebar>
      <UserPasskeys className="flex-grow bg-white" />
    </div>
  );
}