export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
          <title>Agustín Nistal | Portfolio</title>
      </head>
      <body>{children}</body>
    </html>
  )
}
