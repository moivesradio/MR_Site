export const metadata = {
  title: 'Movies Radio',
  description: 'Film Makers #moviesradio',
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
