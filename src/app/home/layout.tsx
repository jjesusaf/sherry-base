import NavBarHome from "@/src/components/global/nav-bar-home";
import TabBar from "../../components/global/tab-bar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex w-full items-start justify-center min-h-[calc(100vh-131px)] p-[1rem] mb-[65px] bg-background-secondary mt-[58px]">
      <NavBarHome />
      {children}
      <TabBar />
    </main>
  );
}
