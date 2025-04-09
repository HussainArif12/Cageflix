import Link from "next/link";
import React from "react";
import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Searchbar from "./Searchbar";

const Navbar: React.FC = () => {
  return (
    <div className="flex justify-between top-0 fixed z-50 w-full bg-black items-center">
      <div>
        <Link href="/">
          <Image
            src="https://images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg?w=940"
            alt="Netflix logo"
            width={80}
            height={200}
          />
        </Link>
      </div>
      <div className="flex ">
        <MagnifyingGlassIcon width={30} className="mx-3" />
        <Searchbar />
      </div>
    </div>
  );
};

export default Navbar;
