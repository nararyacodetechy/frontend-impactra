import MainSidebarLeft from "@/components/layouts/MainSidebarLeft";
import MainSidebarRight from "@/components/layouts/MainSidebarRight";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainSidebarLeft /> 
      <div className="md:pl-72 lg:pr-72 px-5">
        <main className="w-full min-h-screen">{children}</main>
      </div>
      <MainSidebarRight /> 
    </>
  );
}
