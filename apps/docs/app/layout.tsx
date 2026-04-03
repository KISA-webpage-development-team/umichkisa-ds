import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Geist_Mono } from 'next/font/google'
import './globals.css'
import { DocsShell } from '@/components/DocsShell'

const sejongBold = localFont({
  src: '../../../packages/web/src/fonts/Sejonghospital-Bold.ttf',
  variable: '--font-sejong-bold',
  display: 'swap',
})

const sejongLight = localFont({
  src: '../../../packages/web/src/fonts/Sejonghospital-Light.ttf',
  variable: '--font-sejong-light',
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'KISA Design System',
  description: 'Component and token library for umichkisa.com',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${sejongBold.variable} ${sejongLight.variable} ${geistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body>
        <DocsShell>{children}</DocsShell>
      </body>
    </html>
  )
}
