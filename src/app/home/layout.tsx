import NavBar from "./components/nav-bar";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex items-center justify-center min-h-screen p-[1rem] bg-background-secondary mt-[58px]">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
