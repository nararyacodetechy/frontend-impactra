import SidebarLeft from "@/components/SidebarLeft";
import SidebarRight from "@/components/SidebarRight";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarLeft /> 
      <div className="md:pl-72 lg:pr-72 px-5">
        <main className="w-full min-h-screen">{children}</main>
      </div>
      <SidebarRight /> 
    </>
  );
}
