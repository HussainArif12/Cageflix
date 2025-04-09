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


# join the principals with same movie ids and group by nconst
def get_movie_cast():
    # Read the TSV file into a DataFrame
    principals_dataframe = pd.read_csv(
        (f"{filepath}/title.principals.tsv.gz"),
        compression="gzip",
        sep="\t",
        chunksize=CHUNKSIZE,
    )
    media_with_nick = []
    actor_ids = []
    with principals_dataframe as reader:
        for chunk in reader:
            # Process each chunk

            chunk_nick = chunk[
                (chunk["nconst"] == ACTOR_IDENTIFIER) & (chunk["category"] != "self")
            ]

            filtered_chunk = chunk[chunk["tconst"].isin(chunk_nick["tconst"].unique())]

            actor_ids = sum([filtered_chunk["nconst"].unique().tolist(), actor_ids], [])

            chunk_search_result = (
                filtered_chunk.groupby(["tconst"])["nconst"].apply(list).reset_index()
            )

            if not chunk_search_result.empty:
                media_with_nick.append(chunk_search_result)

    media_with_nick = pd.concat(list(media_with_nick), ignore_index=True).to_dict(
        orient="records"
    )

    movie_titles = []
    movie_ids = [movie["tconst"] for movie in media_with_nick]

    basics_dataframe = pd.read_csv(
        f"{filepath}/title.basics.tsv.gz",
        compression="gzip",
        sep="\t",
        chunksize=CHUNKSIZE,
    )

    with basics_dataframe as reader:
        for chunk in reader:
            # Process each chunk
            chunk_search_result = chunk[(chunk["tconst"].isin(movie_ids))]
            chunk_search_result.loc[:, "genres"] = chunk_search_result[
                "genres"
            ].str.split(",")
            if not chunk_search_result.empty:
                movie_titles.append(chunk_search_result)

    movie_titles = pd.concat(movie_titles, ignore_index=True).to_dict(orient="records")

    del basics_dataframe
    del principals_dataframe

    return {
        "movies_with_nick": media_with_nick,
        "all_actors": actor_ids,
        "movie_titles": movie_titles,
    }


def get_actor_names(actor_ids: list[str]):
    # Read the TSV file into a DataFrame
    df = pd.read_csv(
        f"{filepath}/name.basics.tsv.gz",
        compression="gzip",
        sep="\t",
        chunksize=CHUNKSIZE,
    )
    primary_name_result = []
    with df as reader:
        for chunk in reader:
            # Process each chunkfetch
            chunk_search_result = chunk[chunk["nconst"].isin(actor_ids)]
            if not chunk_search_result.empty:
                primary_name_result.append(chunk_search_result)

    return pd.concat(primary_name_result, ignore_index=True).to_dict(orient="records")


def get_ratings(movie_id: str):
    rating_dataframe = pd.read_csv(
        f"{filepath}/title.ratings.tsv.gz",
        compression="gzip",
        sep="\t",
        chunksize=CHUNKSIZE,
    )
    ratings_results = []
    with rating_dataframe as reader:
        for chunk in reader:
            # Process each chunk
            chunk_search_result = chunk[chunk["tconst"] == movie_id]
            if not chunk_search_result.empty:
                ratings_results.append(chunk_search_result)

    return (
        pd.concat(ratings_results, ignore_index=True).to_dict(orient="records")[0]
        if len(ratings_results)
        else {"averageRating": 0, "numVotes": 0}
    )


def find_within_movie_titles(key: str, movie: dict):
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


def find_poster_from_array(movie):
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


movie_cast = get_movie_cast()
print("read movie casts")
movie_titles = [
    movie_item
    for movie_item in movie_cast["movie_titles"]
    if movie_item["titleType"] != "tvEpisode" or movie_item["titleType"] != "tvSpecial"
]
print(movie_titles)

actor_names = {
    actor["nconst"]: actor["primaryName"]
    for actor in get_actor_names(movie_cast["all_actors"])
}

posters = [
    {
        "poster": extract_posters(movie_item["tconst"]),
        "tconst": movie_item["tconst"],
    }
    for movie_item in movie_titles
]


# "movie_titles": movie_titles,
movies_with_nick = [
    {
        **movie_item,
        "genres": find_within_movie_titles("genres", movie_item),
        "startYear": find_within_movie_titles("startYear", movie_item),
        "endYear": find_within_movie_titles("endYear", movie_item),
        "title": find_within_movie_titles("primaryTitle", movie_item),
        "titleType": find_within_movie_titles("titleType", movie_item),
        "runtimeMinutes": find_within_movie_titles("runtimeMinutes", movie_item),
        "averageRating": get_ratings(movie_item["tconst"])["averageRating"],
        "numVotes": get_ratings(movie_item["tconst"])["numVotes"],
        "Poster": find_poster_from_array(movie_item),
        "nconst": [actor_names[actor_id] for actor_id in movie_item["nconst"]],
    }
    for movie_item in movie_cast["movies_with_nick"]
]
nick_fo_data = [
    movie_item
    for movie_item in movies_with_nick
    if movie_item["titleType"] != "tvEpisode" or movie_item["titleType"] != "tvSpecial"
]

with open(f"{filepath.parent}/src/assets/nickfo.json", "w") as file:
    json.dump(nick_fo_data, file, indent=4)
