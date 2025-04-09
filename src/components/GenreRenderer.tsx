"use client";
import useMoviesByGenre from "@/hooks/useMoviesByGenre";
import { useParams } from "next/navigation";
import React from "react";
import RowDisplay from "./RowDisplay";
import LoadingAnimation from "./LoadingAnimation";
import MovieDisplay from "./MovieDisplay";

type GenreRenderProps = {
  genre: string;
};

const GenreRenderer: React.FC<GenreRenderProps> = ({ genre }) => {
  const params = useParams();
  console.log(params.genre);

  const { data: genreMovies } = useMoviesByGenre(genre);
  return (
    <div>
      <div className="my-12">
        <h1 className="mx-2 text-3xl">Viewing for: {genre}</h1>
        <div className="mx-2 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3">
          {genreMovies ? (
            genreMovies.map((item) => (
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
