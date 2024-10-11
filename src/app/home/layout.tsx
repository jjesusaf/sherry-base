import NavBar from "../challengers/components/nav-bar";
import TabBar from "../challengers/components/tab-bar";
import NavMain from "./componentes/nav-main";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex w-full items-start justify-center min-h-[calc(100vh-259.5px)] p-[1rem] mb-[65px] bg-background-secondary mt-[119px]">
      <NavBar />
      <NavMain />
      {children}
      <TabBar />
    </main>
  );
}
