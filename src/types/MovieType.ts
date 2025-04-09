export type MovieType = {
  title: string;
  tconst: string;
  genres: string[];
  startYear: string;
  endYear: string;

  runtimeMinutes: string;
  averageRating: number;
  numVotes: number;
  Poster: {
    poster_large: string;
    poster_small: string;
  };
};
