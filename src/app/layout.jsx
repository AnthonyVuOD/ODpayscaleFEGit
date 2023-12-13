import { Inter } from 'next/font/google'
import clsx from 'clsx'

import '@/styles/tailwind.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: {
    template: '%s - Pocket',
    default: 'ODpayscale',
  },
  description:
    "By leveraging insights from our database of salary data, you'll be able to determine your accurate fair market value.",
}

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en"
      className={clsx('h-full bg-gray-50 antialiased', inter.variable)}
    >
      <body className="flex h-full flex-col">
        {/* {children is replaced by compnent depending on where user is on website} */}
        <div className="flex min-h-full flex-col">{children}</div>
      </body>
    </html>
  )
}
