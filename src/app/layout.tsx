import type { Metadata } from 'next'
import localFont from 'next/font/local'

import AuthObserver from '@/common/AuthObserver'
import Header from '@/layout/Header'
import Footer from '@/layout/Footer'
import '@/styles/globals.css'

import styles from './layout.module.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Jargonary',
  description: 'Your own jargon dictionary',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthObserver />
        <Header />
        <div className={styles.content}>{children}</div>
        <Footer />
      </body>
    </html>
  )
}
