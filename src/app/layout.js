import './globals.css'
import ReactQueryProvider from '../shared/utils/providers/ReactQueryProvider'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <ReactQueryProvider><body>{children}</body></ReactQueryProvider>
      
    </html>
  )
}
