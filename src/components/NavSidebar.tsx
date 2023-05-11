import Image from "next/image"
import Link from "next/link";
import { UserCircleIcon, KeyIcon } from '@heroicons/react/24/outline'

export default function NavSidebar({
  className
}: {
  className?: string
}) {
  return (
    <nav className={`flex flex-col items-start h-screen w-[300px] overflow-y-auto bg-slate-50 border-r border-slate-200 text-black py-4 px-5  ${className}`}>
      <Image src="webauthn-logo.svg" width="45" height="45" alt="Logo" className="mt-2 ml-3 mb-10"></Image>
      <div className="space-y-1 font-semibold">
        <Link href="/passkeys" className="flex items-center p-3 rounded hover:bg-slate-200 no-underline">
          <KeyIcon className="h-6 w-6 mr-3" />
          <span className="font-semibold">Passkeys</span>
        </Link>
      </div>
    </nav>
  );
}
