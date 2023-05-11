import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Image from "next/image"
import { Inter } from 'next/font/google';

const font = Inter({subsets: ['latin']});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${font.className}`}>
      <Component {...pageProps} />
    </div>
  );
}
