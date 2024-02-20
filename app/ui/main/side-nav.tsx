import { GrOverview } from "react-icons/gr";
import { TbMoneybag } from "react-icons/tb";
import Image from "next/image";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";

interface NavLink {
  name: string;
  href: string;
  icon: React.ReactElement;
}

const links: Array<NavLink> = [
  { name: "Overview", href: "/main/overview", icon: <GrOverview /> },
  { name: "Shop", href: "/main/shop", icon: <TbMoneybag /> },
];

export default function SideNav() {
  return (
    <div className="flex flex-col px-4 pt-4 pb-7 min-h-screen">
      <Image src="/motivate-logo.png" className="w-40" width={801} height={806} alt="Motivate logo" />
      <div className="grow">
        {/* links */}
        {links.map((link) => {
          return (
            <div key={link.name} className="flex mb-3 pl-4 py-1 text-sm text-white bg-[#474F7A] rounded-lg items-center">
              <div className="mr-2">{link.icon}</div>
              <Link href={link.href}>{link.name}</Link>
            </div>
          );
        })}
      </div>
      <div>
        <p className="text-[13px] text-[#FFD0EC] mb-2">Sign Out</p>
        <hr className="border-[#474F7A] mb-3" />
        <div className="flex items-center">
          <span className="bg-white mr-3 text-3xl">
            <FaRegUserCircle />
          </span>
          <p className="text-sm text-white">Shen Jiang</p>
        </div>
      </div>
    </div>
  );
}

// Self Notes
// https://www.w3.org/TR/css-flexbox-1/#auto-margins. remember you need a height for mb-auto/grow to work
// type vs interface https://stackoverflow.com/questions/36782896/in-typescript-what-is-the-difference-between-type-and-interface
// https://www.totaltypescript.com/where-to-put-your-types-in-application-code
