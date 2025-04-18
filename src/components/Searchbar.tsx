import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const Searchbar: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState<string>("");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  useEffect(() => {
    const currentSearchParam = searchParams.get("search");
    if (currentSearchParam) {
      setSearchValue(currentSearchParam);
    }
  }, []);

  useEffect(() => {
    if (searchValue) {
      return router.push(
        `${pathname}?${createQueryString("search", searchValue)}`
      );
    }

    return router.push(pathname);
  }, [searchValue]);

  return (
    <div>
      <input
        type="text"
        value={searchValue}
        className="bg-white h-full rounded-md m-2 text-black py-[0.1rem] px-2 w-[32rem]"
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
        placeholder="Search genre, description or actor.."
      />
    </div>
  );
};

export default Searchbar;
