"use client";
import LoadingAnimation from "@/components/LoadingAnimation";
import MovieDisplay from "@/components/MovieDisplay";
import Navbar from "@/components/Navbar";
import useAllMovies from "@/hooks/useAllMovies";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Fuse from "fuse.js";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const fuseOptions = {
  keys: ["title", "genres", "nconst", "Poster.plot"],
  threshold: 0.36,
  includeMatches: true,
};

const AllPage: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <div>
      <Navbar />
      <QueryClientProvider client={queryClient}>
        <AllMovies />
      </QueryClientProvider>
    </div>
  );
};

const AllMovies: React.FC = () => {
  const { data: allMovies } = useAllMovies();
  const searchParams = useSearchParams().get("search");
  if (!allMovies) {
    return <LoadingAnimation />;
  }
  const fuse = new Fuse(allMovies, fuseOptions);
  const searchResults = searchParams
    ? fuse.search(searchParams?.toString() || "").map((item) => item.item)
    : allMovies;
  return (
    <div className="my-12">
      <h1 className="mx-2 text-3xl">
        All movies and shows from Nicholas Cage
        {searchParams && `| Search term: ${searchParams}`}
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
  );
};

export default AllPage;
