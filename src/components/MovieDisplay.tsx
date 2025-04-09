import { MovieType } from "@/types/MovieType";
import React, { useState } from "react";
import Image from "next/image";
import { isSea } from "node:sea";

type MovieDisplayProps = {
  movie: MovieType;
  isSearch?: boolean;
};
const backupImage =
  "https://as2.ftcdn.net/v2/jpg/12/99/90/35/1000_F_1299903552_cfghylJnk6Gc1i29ytjQQsNSOjzyPtU9.jpg";
const MovieDisplay: React.FC<MovieDisplayProps> = ({
  movie,
  isSearch = false,
}: MovieDisplayProps) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  return (
    <div
      className={`relative ${
        isSearch ? "h-[15rem] w-[15rem]" : "h-[20rem] min-w-[15rem] mr-4"
      }    cursor-pointer  ${
        isSearch
          ? "hover:h-[17rem] hover:w-[17rem]"
          : "hover:h-[25rem] hover:min-w-[20rem]"
      } ease-out duration-300`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <p className="text-xl absolute text-white">{movie.title}</p>

      <Image
        src={movie.Poster.poster_small || backupImage}
        fill={true}
        alt="me"
      />
      {isHovering && (
        <div className="absolute w-full  bg-black bottom-[0px]">
          {" "}
          <p className="text-lg"> Is hovering</p>
        </div>
      )}
    </div>
  );
};

export default MovieDisplay;
