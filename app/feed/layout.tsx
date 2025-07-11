import HeaderFilterCategory from "@/components/layouts/HeaderFilterCategory";
import MainSidebarLeft from "@/components/layouts/MainSidebarLeft";
import MainSidebarRight from "@/components/layouts/MainSidebarRight";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Sidebar Left */}
      <MainSidebarLeft />

      {/* Main area with header + scrollable main content */}
      <div className="md:pl-72 lg:pr-72">
        {/* Header fixed */}
        <div className="fixed top-0 left-0 right-0 z-50 md:pl-72 lg:pr-72">
          <HeaderFilterCategory />
        </div>

        {/* Main content, padding-top to avoid being under header */}
        <main className="pt-[50px] w-full min-h-screen">
          {children}
        </main>
      </div>

      {/* Sidebar Right */}
      <MainSidebarRight />
    </>
  );
}
