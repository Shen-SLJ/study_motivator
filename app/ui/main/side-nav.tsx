import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";
import NavLinks from "./nav-links";

export default function SideNav() {
  return (
    <div className="flex flex-col px-4 pt-6 pb-7 min-h-screen">
      <Image src="/motivate-logo.png" className="w-40" width={801} height={806} alt="Motivate logo" />
      <div className="grow">
        <NavLinks />
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

