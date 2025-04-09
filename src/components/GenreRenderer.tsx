"use client";
import useMoviesByGenre from "@/hooks/useMoviesByGenre";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import RowDisplay from "./RowDisplay";
import LoadingAnimation from "./LoadingAnimation";
import MovieDisplay from "./MovieDisplay";
import Fuse from "fuse.js";

type GenreRenderProps = {
  genre: string;
};
const fuseOptions = {
  keys: ["title", "genres", "nconst", "Poster.plot"],
  threshold: 0.36,
  includeMatches: true,
};

const GenreRenderer: React.FC<GenreRenderProps> = ({ genre }) => {
  const params = useParams();
  console.log(params.genre);
  const searchParams = useSearchParams().get("search");
  const { data: genreMovies } = useMoviesByGenre(genre);

  if (!genreMovies) {
    return <LoadingAnimation />;
  }
  const fuse = new Fuse(genreMovies, fuseOptions);
  const searchResults = searchParams
    ? fuse.search(searchParams?.toString() || "").map((item) => item.item)
    : genreMovies;
  return (
    <div>
      <div className="my-12">
        <h1 className="mx-2 text-3xl">
          Viewing for: {genre}
          {searchParams && <span>| Search term: {searchParams}</span>}
        </h1>
        <div className="mx-2 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3">
          {searchResults ? (
            searchResults.map((item) => (
              <div className="my-4" key={item.tconst}>
                <MovieDisplay movie={item} isSearch={true} />
              </div>
            ))
          ) : (
            <LoadingAnimation height={200} width={200} />
          )}
        </div>
      </div>
    </div>
  );
};

export default GenreRenderer;
