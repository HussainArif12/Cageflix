import useSearchMovies from "@/hooks/useSearchMovies";
import { useSearchParams } from "next/navigation";
import React from "react";
import MovieDisplay from "./MovieDisplay";

const SearchResults: React.FC = () => {
  const search = useSearchParams().get("search") || "";
  const { data: searchData } = useSearchMovies(search);

  return (
    <div className="my-12">
      <h1 className="mx-2 text-3xl">Search results for: {search}</h1>
      <div className="mx-2 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3">
        {searchData &&
          searchData.map((item) => (
            <div className="my-4" key={item.item.tconst}>
              <MovieDisplay movie={item.item} isSearch={true} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchResults;
