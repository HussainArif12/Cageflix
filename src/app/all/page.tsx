"use client";
import LoadingAnimation from "@/components/LoadingAnimation";
import MovieDisplay from "@/components/MovieDisplay";
import Navbar from "@/components/Navbar";
import useAllMovies from "@/hooks/useAllMovies";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

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
  return (
    <div className="my-12">
      <h1 className="mx-2 text-3xl">All movies and shows from Nicholas Cage</h1>
      <div className="mx-2 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3">
        {allMovies ? (
          allMovies.map((item) => (
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
