import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ArrowDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { FC } from "react";

const genres = [
  "Comedy",
  "Drama",
  "Romance",
  "Thriller",
  "War",
  "Music",
  "Sport",
  "Fantasy",
];

const DropdownMenu: FC = () => {
  return (
    <Menu>
      <MenuButton
        className={
          "mx-3 flex flex-row items-center rounded-md hover:bg-slate-800 cursor-pointer"
        }
      >
        <span className="mx-3">Genre</span>
        <ArrowDownIcon height={15} width={14} />
      </MenuButton>
      <MenuItems
        anchor="bottom"
        className="rounded-md border-1 border-red-500 my-3 bg-slate-800"
      >
        <MenuItem>
          <Link
            className="p-2 block data-[focus]:bg-blue-100 data-[focus]:text-black w-[10rem] border-1 border-black"
            href="/all"
          >
            All
          </Link>
        </MenuItem>
        {genres.map((item) => (
          <MenuItem key={item}>
            <Link
              className="block p-2 data-[focus]:text-black data-[focus]:bg-blue-100 w-[10rem] border-1 border-black"
              href={`/genre/${item}`}
            >
              {item}
            </Link>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};
export default DropdownMenu;
