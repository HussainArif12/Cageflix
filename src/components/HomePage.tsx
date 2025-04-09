import useMoviesByGenre from "@/hooks/useMoviesByGenre";
import RowDisplay from "./RowDisplay";
import Image from "next/image";
import Link from "next/link";
import useLatestMovies from "@/hooks/useLatestMovies";
import LoadingAnimation from "./LoadingAnimation";

function HomePage() {
  const { data: latestMovies } = useLatestMovies();
  const { data: comedyMovies } = useMoviesByGenre("Comedy", 10);
  const { data: dramaMovies } = useMoviesByGenre("Drama", 10);
  const { data: thrillerMovies } = useMoviesByGenre("Thriller", 10);
  return (
    <div className="my-10 pl-10 justify-center items-center h-full w-full ">
      <div className="relative flex flex-col items-center">
        <Image
          src="https://images7.alphacoders.com/640/thumb-1920-640317.jpg"
          width={1920}
          height={1080}
          alt="Image of Nick cage"
          className=" w-[75%] h-full "
        />

        <span className="absolute my-10 bg-black p-7 rounded-md opacity-70">
          <p className="text-3xl font-bold   text-center  text-red-400">
            {" "}
            Welcome to Cageflix!
          </p>
          <p>The central hub of all Nicholas Cage movies and TV Shows</p>
        </span>

        <button className="absolute bottom-5 justify-center bg-slate-200 p-4 font-bold rounded-lg text-black opacity-70 hover:opacity-100">
          <Link href={"https://www.imdb.com/name/nm0000115/"}>
            View on IMDb
          </Link>
        </button>
      </div>
      <div className="my-10">
        <p className="text-2xl">Latest/Upcoming</p>
        {latestMovies ? (
          <RowDisplay movies={latestMovies} />
        ) : (
          <LoadingAnimation />
        )}
        <p className="mt-10 text-2xl">Best of Comedy</p>
        {comedyMovies ? (
          <RowDisplay movies={comedyMovies} />
        ) : (
          <LoadingAnimation />
        )}
        <div className="mt-10">
          <p className="text-2xl">Best of Drama</p>
          {dramaMovies ? (
            <RowDisplay movies={dramaMovies} />
          ) : (
            <LoadingAnimation />
          )}
        </div>
        <p className="mt-10 text-2xl">Best of Thriller</p>
        {thrillerMovies ? (
          <RowDisplay movies={thrillerMovies} />
        ) : (
          <LoadingAnimation />
        )}
      </div>
    </div>
  );
}

export default HomePage;
