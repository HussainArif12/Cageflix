import { MovieType } from "@/types/MovieType";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/20/solid";
import React, { useRef } from "react";
import MovieDisplay from "./MovieDisplay";

type RowDisplayProps = {
  movies: MovieType[];
};

const RowDisplay: React.FC<RowDisplayProps> = ({ movies }) => {
  const navRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="flex flex-row overflow-x-auto scrollbar-hide w-[98%]"
      ref={navRef}
    >
      <div>
        <button className="absolute cursor-pointer hover:opacity-100 bg-slate-300 opacity-70 py-10 left-10 z-10 text-black my-[5rem]">
          <ArrowLeftCircleIcon
            height={36}
            width={36}
            onClick={() => {
              navRef.current?.scrollBy({ left: -100, behavior: "smooth" });
            }}
          />
        </button>
      </div>
      {movies.map((item) => (
        <MovieDisplay key={item.tconst} movie={item} />
      ))}
      <div>
        <button className="absolute cursor-pointer bg-slate-300 hover:opacity-100 opacity-70 py-10 right-8 z-10 text-black my-[5rem]">
          <ArrowRightCircleIcon
            height={36}
            width={36}
            onClick={() => {
              navRef.current?.scrollBy({ left: 100, behavior: "smooth" });
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default RowDisplay;
