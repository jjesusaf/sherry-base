import NavBar from "./components/nav-bar";
import TabBar from "./components/tab-bar";
import NavMain from "./components/nav-main";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex items-start justify-center min-h-screen p-[1rem] mb-[65px] bg-background-secondary mt-[119px]">
        <NavBar />
        <NavMain />
        {children}
        <TabBar />
      </body>
    </html>
  );
}
