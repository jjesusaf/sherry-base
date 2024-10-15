import NavBar from "../../components/global/nav-bar";
import TabBar from "../../components/global/tab-bar";
import NavMain from "./components/nav-main";
import { CampaignCoverProvider } from "./context/CampaignCoverContext";
export default function CreatePostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex w-full items-start justify-center min-h-[calc(100vh-207.5px)] p-[1rem] mb-[89px] bg-background-secondary mt-[118.5px]">
      <CampaignCoverProvider>
        <NavBar />
        <NavMain />
        {children}
        <TabBar />
      </CampaignCoverProvider>
    </main>
  );
}
