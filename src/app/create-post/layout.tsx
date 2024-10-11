import NavBar from "../challengers/components/nav-bar";
import TabBar from "../challengers/components/tab-bar";
import NavMain from "./components/nav-main";
import { CampaignCoverProvider } from "./context/CampaignCoverContext";
export default function CreatePostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex w-full items-start justify-center min-h-[calc(100vh-191px)] p-[1rem] mb-[65px] bg-background-secondary mt-[119px]">
      <CampaignCoverProvider>
        <NavBar />
        <NavMain />
        {children}
        <TabBar />
      </CampaignCoverProvider>
    </main>
  );
}
