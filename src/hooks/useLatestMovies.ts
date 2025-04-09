import { MovieType } from "@/types/MovieType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const fetchLatest = async () => {
  const response = await axios.get("http://localhost:3000/api/get_latest");
  return response.data as MovieType[];
};

const useLatestMovies = () => {
  return useQuery({ queryKey: ["movies-latest"], queryFn: fetchLatest });
};

export default useLatestMovies;
