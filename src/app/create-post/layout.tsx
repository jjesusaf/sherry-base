import NavBar from "../challengers/components/nav-bar";
import TabBar from "../challengers/components/tab-bar";
import NavMain from "./components/nav-main";
export default function CreatePostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <div className="flex items-start justify-center min-h-screen p-[1rem] mb-[65px] bg-background-secondary mt-[119px]">
        <NavBar />
        <NavMain />
        {children}
        <TabBar />
      </div>
    </html>
  );
}
