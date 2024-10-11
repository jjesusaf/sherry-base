import NavBarHome from "@/src/components/global/nav-bar-home";
import TabBar from "../../components/global/tab-bar";
import NavMain from "./componentes/nav-main";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex w-full items-start justify-center min-h-[calc(100vh-259.5px)] p-[1rem] mb-[65px] bg-background-secondary mt-[119px]">
      <NavBarHome />
      <NavMain />
      {children}
      <TabBar />
    </main>
  );
}
