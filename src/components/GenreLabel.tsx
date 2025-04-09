import { FC } from "react";

type GenreLabelProps = {
  text: string;
};
const GenreLabel: FC<GenreLabelProps> = ({ text }) => {
  return (
    <span className="text-sm rounded-md bg-blue-600 h-6 w-6 p-1 mx-1">
      {text}
    </span>
  );
};
export default GenreLabel;
