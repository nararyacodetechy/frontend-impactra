import SidebarLeft from "@/components/SidebarLeft";
import SidebarRight from "@/components/SidebarRight";
import HeaderBack from "@/components/HeaderBack";

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
