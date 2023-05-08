import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Image from "next/image";
import { Inter } from 'next/font/google'

const font = Inter({ weight: '400', subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`flex flex-col min-h-screen ${font.className}`}>
      <section className="flex items-center justify-center md:px-10 xs:px-5 py-5">
        <Image src="webauthn-logo.svg" width="100" height="100" alt="Logo" className="mb-14"></Image>
      </section>
      <Component {...pageProps} />
    </main>
  );
}
