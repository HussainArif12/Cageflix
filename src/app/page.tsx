"use client";

import HomePage from "@/components/HomePage";
import SearchResults from "@/components/SearchResults";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";

export default function Home() {
  const queryClient = new QueryClient();
  const searchParams = useSearchParams().get("search");
  return (
    <div className="flex flex-col scrollbar-hide font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <div>
        <QueryClientProvider client={queryClient}>
          {searchParams ? <SearchResults /> : <HomePage />}
        </QueryClientProvider>
      </div>
    </div>
  );
}
