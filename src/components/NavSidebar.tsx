import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/router";
import { FingerPrintIcon } from '@heroicons/react/24/outline'

export default function NavSidebar({
  className
}: {
  className?: string
}) {
  const router = useRouter();
  const currentRoute = router.pathname.toLowerCase();

  function getActiveBackgroundClass(route: string): string {
    return currentRoute.startsWith(route) ? 'bg-slate-200' : '';
  }

  return (
    <nav className={`flex flex-col bg-slate-50 border-r border-slate-200 text-gray-800 ${className}`}>
      <Image src="webauthn-logo.svg" width="45" height="45" alt="Logo" className="mt-6 ml-6 mb-8"></Image>
      <div className="flex-grow space-y-1 font-semibold px-5">
        <Link
          href="/passkeys"
          className={`flex items-center p-3 rounded hover:bg-slate-200 no-underline ${getActiveBackgroundClass('/passkeys')}`}
        >
          <FingerPrintIcon className="h-6 w-6 mr-3" />
          <span className="font-semibold">Passkeys</span>
        </Link>
      </div>
    </nav>
  );
}
