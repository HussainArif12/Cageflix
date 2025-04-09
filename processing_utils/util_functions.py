import pandas as pd
import pathlib
from dotenv import load_dotenv
import json
import os
import requests

load_dotenv()
CHUNKSIZE = 10**6
ACTOR_IDENTIFIER = "nm0000115"  # Nicolas Cage's identifier
API_KEY = os.getenv("OMDB_API_KEY")
print(API_KEY)
OMDB_URL = "http://www.omdbapi.com/"
BACKUP_IMAGE_URL = "https://as2.ftcdn.net/v2/jpg/12/99/90/35/1000_F_1299903552_cfghylJnk6Gc1i29ytjQQsNSOjzyPtU9.jpg"
filepath = pathlib.Path(__file__).resolve().parent


def generate_dataframe(filepath: str):
    return pd.read_csv(
        filepath,
        compression="gzip",
        sep="\t",
        chunksize=CHUNKSIZE,
    )


# join the principals with same movie ids and group by nconst
def get_movie_cast():
    # Read the TSV file into a DataFrame
    principals_dataframe = generate_dataframe((f"{filepath}/title.principals.tsv.gz"))
    media_with_nick = []
    actors_in_movies = []
    with principals_dataframe as reader:
        for chunk in reader:
            nick_records = chunk[
                (chunk["nconst"] == ACTOR_IDENTIFIER) & (chunk["category"] != "self")
            ]

            nick_movies = chunk[chunk["tconst"].isin(nick_records["tconst"].unique())]

            actors_in_movies = sum(
                [nick_movies["nconst"].unique().tolist(), actors_in_movies], []
            )

            filtered_movies = (
                nick_movies.groupby(["tconst"])["nconst"].apply(list).reset_index()
            )

            if not filtered_movies.empty:
                media_with_nick.append(filtered_movies)

    media_with_nick = pd.concat(list(media_with_nick), ignore_index=True).to_dict(
        orient="records"
    )

    movie_titles = []
    movie_ids = [movie["tconst"] for movie in media_with_nick]

    basics_dataframe = generate_dataframe(f"{filepath}/title.basics.tsv.gz")

    with basics_dataframe as reader:
        for chunk in reader:
            # Process each chunk
            filtered_movies = chunk[(chunk["tconst"].isin(movie_ids))]
            filtered_movies.loc[:, "genres"] = filtered_movies["genres"].str.split(",")
            if not filtered_movies.empty:
                movie_titles.append(filtered_movies)

    movie_titles = pd.concat(movie_titles, ignore_index=True).to_dict(orient="records")

    del basics_dataframe
    del principals_dataframe

    return {
        "movies_with_nick": media_with_nick,
        "all_actors": actors_in_movies,
        "movie_titles": movie_titles,
    }


def get_actor_names(actor_ids: list[str]):
    # Read the TSV file into a DataFrame
    df = generate_dataframe(f"{filepath}/name.basics.tsv.gz")
    actor_names = []
    with df as reader:
        for chunk in reader:
            # Process each chunkfetch
            actor_name = chunk[chunk["nconst"].isin(actor_ids)]
            if not actor_name.empty:
                actor_names.append(actor_name)

    return pd.concat(actor_names, ignore_index=True).to_dict(orient="records")


def get_ratings(movie_id: str):
    rating_dataframe = generate_dataframe(f"{filepath}/title.ratings.tsv.gz")
    ratings_results = []
    with rating_dataframe as reader:
        for chunk in reader:
            # Process each chunk
            rating = chunk[chunk["tconst"] == movie_id]
            if not rating.empty:
                ratings_results.append(rating)

    return (
        pd.concat(ratings_results, ignore_index=True).to_dict(orient="records")[0]
        if len(ratings_results)
        else {"averageRating": 0, "numVotes": 0}
    )


def find_within_movie_titles(movie_titles: list, key: str, movie: dict):
    return next(
        (item[key] for item in movie_titles if item["tconst"] == movie["tconst"]),
        "",
    )


def extract_posters(movie_id: str):
    print(f"finding for {movie_id}")
    request = requests.get(f"{OMDB_URL}?i={movie_id}&apikey={API_KEY}")
    response = json.loads(request.text)
    description = response["Plot"] if "Plot" in response else ""

    if "Poster" in response:
        poster_url = response["Poster"]
        if poster_url == "N/A":
            return {
                "poster_large": BACKUP_IMAGE_URL,
                "poster_small": BACKUP_IMAGE_URL,
                "plot": description,
            }
        poster_large = poster_url[:-5] + "00" + poster_url[-4:]
        return {
            "poster_large": poster_large,
            "poster_small": poster_url,
            "plot": description,
        }

    return {
        "poster_large": BACKUP_IMAGE_URL,
        "poster_small": BACKUP_IMAGE_URL,
        "plot": description,
    }


def find_poster_from_array(posters, movie):
    return next(
        (
            {
                "poster_large": item["poster"]["poster_large"],
                "poster_small": item["poster"]["poster_small"],
                "plot": item["poster"]["plot"],
            }
            for item in posters
            if item["tconst"] == movie["tconst"]
        ),
        "",
    )
