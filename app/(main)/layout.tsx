import SideNav from "@/app/ui/main/side-nav";

/**
 * Layout incorporating a menu
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-[#1F2544]">
      <div className="mr-3">
        <SideNav />
      </div>
      <div className="grow">{children}</div>
    </div>
  );
}
