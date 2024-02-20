"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrOverview } from "react-icons/gr";
import { MdOutlineTaskAlt } from "react-icons/md";
import { TbMoneybag } from "react-icons/tb";

type NavLink = {
  name: string;
  href: string;
  icon: React.ReactElement;
}

const links: Array<NavLink> = [
  { name: "Overview", href: "/overview", icon: <GrOverview /> },
  { name: "Shop", href: "/shop", icon: <TbMoneybag /> },
  { name: "Tasks", href: "/tasks", icon: <MdOutlineTaskAlt /> }
];

export default function NavLinks() {
  const curPath = usePathname();

  return (
    <>
      {/* links */}
      {links.map((link) => {
        return (
          <div
            key={link.name}
            className={clsx("flex mb-3 pl-4 py-1 text-sm text-white bg-[#474F7A] rounded-lg items-center", curPath === link.href && "bg-[#81689D]")}
          >
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
