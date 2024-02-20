import Link from "next/link";
import { GrOverview } from "react-icons/gr";
import { TbMoneybag } from "react-icons/tb";

interface NavLink {
  name: string;
  href: string;
  icon: React.ReactElement;
}

const links: Array<NavLink> = [
  { name: "Overview", href: "/overview", icon: <GrOverview /> },
  { name: "Shop", href: "/shop", icon: <TbMoneybag /> },
];

export default function NavLinks() {
  return (
    <>
      {/* links */}
      {links.map((link) => {
        return (
          <div key={link.name} className="flex mb-3 pl-4 py-1 text-sm text-white bg-[#474F7A] rounded-lg items-center">
            <div className="mr-2">{link.icon}</div>
            <Link href={link.href}>{link.name}</Link>
          </div>
        );
      })}
    </>
  );
}

// Self Notes
// type vs interface https://stackoverflow.com/questions/36782896/in-typescript-what-is-the-difference-between-type-and-interface
// https://www.totaltypescript.com/where-to-put-your-types-in-application-code