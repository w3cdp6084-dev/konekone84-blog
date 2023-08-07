import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Provider from "./Provider";
import Header from "./components/Header";
const inter = Inter({ subsets: ['latin'] })

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
}
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
      <Provider>
        <Header />
        {children}
      </Provider>
      </body>
    </html>
  )
}
