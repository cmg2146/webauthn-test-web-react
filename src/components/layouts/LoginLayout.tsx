import { ReactNode } from "react";
import Image from "next/image";

export default function LoginLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-5 py-5 md:px-10">
      <Image src="webauthn-logo.svg" width="90" height="90" alt="Logo" className="my-10"></Image>
      {children}
    </div>
  );
}
