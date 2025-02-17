import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import CircularNav from './components/circular-nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '星扬合唱团',
  description: '上海星扬室内合唱团官方网站',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <CircularNav />
        {children}
      </body>
    </html>
  )
}
