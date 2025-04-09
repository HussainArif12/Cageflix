import { MovieType } from "@/types/MovieType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type SearchResultType = {
  item: MovieType;
};

const searchMovies = async (searchQuery: string) => {
  const response = await axios.get("http://localhost:3000/api/search", {
    params: { search: searchQuery },
  });
  return response.data as SearchResultType[];
};

const useSearchMovies = (searchQuery: string) => {
  return useQuery({
    queryKey: ["movies", searchQuery],
    queryFn: () => searchMovies(searchQuery),
  });
};

export default useSearchMovies;
