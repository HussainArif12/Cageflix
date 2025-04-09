"use client";
import GenreRenderer from "@/components/GenreRenderer";
import Navbar from "@/components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

const GenrePage: React.FC = () => {
  const params = useParams().genre;
  const queryClient = new QueryClient();

  return (
    <div>
      <Navbar />

      <div className="my-20">
        <QueryClientProvider client={queryClient}>
          <GenreRenderer genre={params?.toString() || ""} />
        </QueryClientProvider>
      </div>
    </div>
  );
};

export default GenrePage;
