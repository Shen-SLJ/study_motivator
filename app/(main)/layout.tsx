import SideNav from "@/app/ui/main/side-nav";

/**
 * Layout incorporating a menu
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-[#1F2544] pl-5 pr-8 pt-6 pb-7 min-h-screen">
      <div className="mr-16">
        <SideNav />
      </div>
      <div className="grow">{children}</div>
    </div>
  );
}
