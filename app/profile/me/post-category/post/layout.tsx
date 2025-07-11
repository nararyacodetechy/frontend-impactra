import SidebarLeft from "@/components/layouts/SidebarLeft";
import SidebarRight from "@/components/layouts/SidebarRight";

export default function PostLayout({ children }: { children: React.ReactNode }) {
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
