import NavBar from "../../components/global/nav-bar";
import TabBar from "../../components/global/tab-bar";
import NavMain from "./components/nav-main";
export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex items-start justify-center min-h-[calc(100vh-207.5px)] p-[1rem] mb-[89px] bg-background-secondary mt-[118.5px]">
      <NavBar />
      <NavMain />
      {children}
      <TabBar />
    </main>
  );
}
