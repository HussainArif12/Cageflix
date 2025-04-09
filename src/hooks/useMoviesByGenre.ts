import { MovieType } from "@/types/MovieType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const fetchMoviesByGenre = async (
  genre: string,
  limitQuery?: number
) => {
  const response = await axios.get(
    `http://localhost:3000/api/get_by_genre/${genre}`,
    { params: { limit: limitQuery } }
  );
  console.log(response);
  return response.data as MovieType[];
};

const useMoviesByGenre = (genre: string, limitQuery?: number) => {
  return useQuery({
    queryKey: ["moviesByGenre", genre],
    queryFn: () => fetchMoviesByGenre(genre, limitQuery),
  });
};

export default useMoviesByGenre;
