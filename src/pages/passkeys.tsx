import NavSidebar from "@/components/NavSidebar";

import UserPasskeys from "@/components/UserPasskeys";

export default function Passkeys() {
  // TODO: Add a layout page to reuse the nav sidebar
  return (
    <div className="relative min-h-screen flex flex-row">
      <NavSidebar></NavSidebar>
      <UserPasskeys className="flex-grow bg-white" />
    </div>
  );
}
