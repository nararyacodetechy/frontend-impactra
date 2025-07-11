import HeaderBack from "@/components/layouts/HeaderBack";
import SidebarLeft from "@/components/layouts/SidebarLeft";
import SidebarRight from "@/components/layouts/SidebarRight";

export default function PostDetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarLeft />
      <div className="">
        <HeaderBack />
        <main className="w-full min-h-screen">{children}</main>
      </div>
      <SidebarRight />
    </>
  );
}
