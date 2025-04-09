import useMoviesByGenre from "@/hooks/useMoviesByGenre";
import RowDisplay from "./RowDisplay";
import Image from "next/image";

function HomePage() {
  const { data: comedyMovies, isLoading: areComedyMoviesLoading } =
    useMoviesByGenre("Comedy");
  const { data: dramaMovies } = useMoviesByGenre("Drama");
  return (
    <div className="my-10  pl-10 justify-center items-center h-full w-full ">
      <div className="flex flex-col items-center">
        <Image
          src="https://images7.alphacoders.com/640/thumb-1920-640317.jpg"
          width={1920}
          height={1080}
          alt="Image of Nick cage"
          className="w-[80%] h-[50%]"
        />
        <p className="absolute">hi</p>
      </div>
      <p className="text-2xl">Best of Comedy</p>
      {comedyMovies ? <RowDisplay movies={comedyMovies} /> : <p>Not found</p>}
      <div className="my-10">
        <p className="text-2xl">Best of Drama</p>
        {dramaMovies ? <RowDisplay movies={dramaMovies} /> : <p>Not found</p>}
      </div>
    </div>
  );
}

export default HomePage;
