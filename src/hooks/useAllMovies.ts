import { MovieType } from "@/types/MovieType";
import getAPIURL from "@/utils/getAPIURL";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const fetchAllMovies = async () => {
  const response = await axios.get(`${getAPIURL()}/api/get_all_movies`);
  return response.data as MovieType[];
};

const useAllMovies = () => {
  return useQuery({ queryKey: ["movies"], queryFn: fetchAllMovies });
};

export default useAllMovies;
