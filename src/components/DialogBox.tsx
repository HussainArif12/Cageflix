import { MovieType } from "@/types/MovieType";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import GenreLabel from "./GenreLabel";
import LoadingAnimation from "./LoadingAnimation";

type DialogBoxProps = {
  movie: MovieType;
  isOpen: boolean;
  handleClose: () => void;
};

const DialogBox: React.FC<DialogBoxProps> = ({
  movie,
  isOpen,
  handleClose,
}) => {
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [imageError, setImageError] = useState<boolean>(false);
  const cast = movie.nconst.filter(
    (value, index) => movie.nconst.indexOf(value) === index
  );

  useEffect(() => {
    setImageLoading(true);
  }, []);
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none "
      onClose={handleClose}
    >
      <div className="fixed my-10 inset-0 z-10 w-full overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-[85rem] border-1 border-red-500 h-full rounded-xl bg-black p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="flex flex-row mb-2 text-2xl font-bold font-medium text-white"
            >
              <div className="flex flex-row flex-none">
                {movie.title} ({movie.startYear != "\\N" && movie.startYear})
                <div>
                  {movie.genres.map((item) => (
                    <GenreLabel key={item} text={item} />
                  ))}
                  <span className="text-sm bg-yellow-300 rounded-md text-black h-6 w-6 p-1 mx-3">
                    {movie.averageRating}
                  </span>
                  <span className="text-sm bg-green-300 text-black rounded-md  h-6 w-6 p-1 mx-1">
                    {movie.numVotes} votes
                  </span>
                </div>
              </div>
              <div className="flex-grow"></div>
              <XMarkIcon
                height={20}
                width={30}
                className="text-black bg-red-400 cursor-pointer left-3 top-0 hover:bg-red-200"
                onClick={handleClose}
              />
            </DialogTitle>

            <div className="flex flex-row">
              <div>
                {imageLoading && <LoadingAnimation />}
                <Image
                  src={
                    imageError
                      ? movie.Poster.poster_small
                      : movie.Poster.poster_large
                  }
                  width={900}
                  height={100}
                  alt={movie.title}
                  onLoad={() => setImageLoading(false)}
                  onError={() => setImageError(true)}
                  className={`${
                    !imageLoading && "border-1 border-red-500"
                  }  max-h-[45rem] max-w-[40rem] rounded-md`}
                />
              </div>
              <div className="mx-4">
                <div className="border-1 border-red-500 rounded-md p-3">
                  <h1 className="text-xl font-bold">Plot</h1>
                  <p>{movie.Poster.plot}</p>
                </div>
                <div className="border-1 border-red-500 rounded-md px-3 my-5">
                  <h1 className="text-xl font-bold">Cast</h1>
                  <ul>
                    {cast.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogBox;
