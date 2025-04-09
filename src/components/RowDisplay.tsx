import { MovieType } from "@/types/MovieType";
import React from "react";
import MovieDisplay from "./MovieDisplay";
import {
  ArrowLeftCircleIcon,
  ArrowLeftIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/20/solid";

type RowDisplayProps = {
  movies: MovieType[];
};

const RowDisplay: React.FC<RowDisplayProps> = ({ movies }) => {
  return (
    <div className="flex flex-row overflow-x-auto scrollbar-hide w-[98%]">
      <div>
        <button className="absolute bg-slate-300 opacity-70 py-10 left-10 z-10 text-black my-[5rem]">
          <ArrowLeftCircleIcon height={36} width={36} />
        </button>
      </div>
      {movies.map((item) => (
        <MovieDisplay key={item.tconst} movie={item} />
      ))}
      <div>
        <button className="absolute bg-slate-300 opacity-70 py-10 right-8 z-10 text-black my-[5rem]">
          <ArrowRightCircleIcon height={36} width={36} />
        </button>
      </div>
    </div>
  );
};

export default RowDisplay;
