import HeaderBack from "@/components/layouts/HeaderBack";
import MainSidebarLeft from "@/components/layouts/MainSidebarLeft";
import MainSidebarRight from "@/components/layouts/MainSidebarRight";

export default function PostDetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainSidebarLeft />
      <div className="">
        <HeaderBack />
        <main className="w-full min-h-screen">{children}</main>
      </div>
      <MainSidebarRight />
    </>
  );
}