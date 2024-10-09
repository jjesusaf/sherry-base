import NavBar from "../challengers/components/nav-bar";
import TabBar from "../challengers/components/tab-bar";
import NavMain from "./components/nav-main";
import TabsBar from "./components/tabs-bar";



export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex w-full items-start justify-center min-h-screen p-[1rem] mb-[65px] bg-background-secondary mt-[155px]">
      <NavBar />
      <NavMain />
      <TabsBar />
      {children}
      <TabBar />
    </main>
  );
}
