import NavBar from "../../components/global/nav-bar";
import TabBar from "../../components/global/tab-bar";
import NavMain from "./components/nav-main";
import TabsBar from "./components/tabs-bar";



export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex w-full items-start justify-center min-h-[calc(100vh-259.5px)] p-[1rem] mb-[65px] bg-background-secondary mt-[155px]">
      <NavBar />
      <NavMain />
      {children}
      <TabBar />
    </main>
  );
}
