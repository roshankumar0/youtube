
import AppContext from '@/context/contextApi'
import './globals.css'

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <AppContext>
        <body suppressHydrationWarning={true}>
          {children}
        </body>
      </AppContext>
    </html>
  )
}
