"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Searchbar from "./Searchbar";
import DropdownMenu from "./DropdownMenu";

const Navbar: React.FC = () => {
  const [searchVisible, setSearchVisible] = useState<boolean>(false);

  return (
    <div className="flex justify-between top-0 fixed z-50 w-full bg-black items-center">
      <div className="flex flex-row">
        <Link href="/">
          <Image
            src="https://images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg?w=940"
            alt="Netflix logo"
            width={80}
            height={200}
          />
        </Link>

        <DropdownMenu />
      </div>
      <div className="flex ">
        <MagnifyingGlassIcon
          width={30}
          className="mx-10 cursor-pointer"
          onClick={() => setSearchVisible((current) => !current)}
        />
        <div
          className={`transition-all duration-300 ease-in-out ${
            searchVisible ? "mr-2" : "-mr-[16rem] delay-150"
          }`}
        >
          <Searchbar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
