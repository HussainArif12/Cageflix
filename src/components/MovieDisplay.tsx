import { MovieType } from "@/types/MovieType";
import React, { useState } from "react";
import Image, { ImageLoaderProps } from "next/image";
import { Dialog } from "@headlessui/react";
import DialogBox from "./DialogBox";

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
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  console.log(movie.Poster.poster_large);
  return (
    <div
      className={`relative border-1 border-solid rounded-lg border-red-500 ${
        isSearch ? "h-[15rem] w-[15rem]" : "h-[20rem] min-w-[15rem] mr-4"
      }    cursor-pointer  ${
        isSearch
          ? "hover:h-[17rem] hover:w-[17rem]"
          : "hover:h-[25rem] hover:min-w-[20rem]"
      } ease-out duration-300`}
      onClick={() => setDialogOpen(true)}
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Image src={movie.Poster.poster_small} fill={true} alt={movie.tconst} />
      <div className="absolute bg-black text-white w-full bottom-0">
        <p>{isHovering && movie.title}</p>
      </div>
      <DialogBox
        handleClose={() => setDialogOpen(false)}
        isOpen={dialogOpen}
        movie={movie}
      />
    </div>
  );
};

export default MovieDisplay;
