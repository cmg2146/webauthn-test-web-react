import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Image from "next/image"
import { Inter } from 'next/font/google';

const font = Inter({subsets: ['latin']});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`flex flex-col min-h-screen ${font.className}`}>
      <section className="flex items-center justify-center md:px-10 xs:px-5 py-10">
        <Image src="webauthn-logo.svg" width="90" height="90" alt="Logo" className="mb-5"></Image>
      </section>
      <Component {...pageProps} />
    </main>
  );
}
