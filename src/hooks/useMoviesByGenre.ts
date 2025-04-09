import { MovieType } from "@/types/MovieType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const fetchMoviesByGenre = async (genre: string) => {
  const response = await axios.get(
    `http://localhost:3000/api/get_by_genre/${genre}`
  );
  console.log(response);
  return response.data as MovieType[];
};

const useMoviesByGenre = (genre: string) => {
  return useQuery({
    queryKey: ["moviesByGenre", genre],
    queryFn: () => fetchMoviesByGenre(genre),
  });
};

export default useMoviesByGenre;
