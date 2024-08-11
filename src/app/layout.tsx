export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>React</title>
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
