import pathlib
import json

from util_functions import (
    extract_posters,
    find_poster_from_array,
    find_within_movie_titles,
    get_actor_names,
    get_movie_cast,
    get_ratings,
)

filepath = pathlib.Path(__file__).resolve().parent


movie_cast = get_movie_cast()
print("read movie casts")
movie_titles = movie_cast["movie_titles"]

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
        "genres": find_within_movie_titles(movie_titles, "genres", movie_item),
        "startYear": find_within_movie_titles(movie_titles, "startYear", movie_item),
        "endYear": find_within_movie_titles(movie_titles, "endYear", movie_item),
        "title": find_within_movie_titles(movie_titles, "primaryTitle", movie_item),
        "titleType": find_within_movie_titles(movie_titles, "titleType", movie_item),
        "runtimeMinutes": find_within_movie_titles(
            movie_titles, "runtimeMinutes", movie_item
        ),
        "averageRating": get_ratings(movie_item["tconst"])["averageRating"],
        "numVotes": get_ratings(movie_item["tconst"])["numVotes"],
        "Poster": find_poster_from_array(posters, movie_item),
        "nconst": [actor_names[actor_id] for actor_id in movie_item["nconst"]],
    }
    for movie_item in movie_cast["movies_with_nick"]
]

with open(f"{filepath.parent}/src/assets/nickfo.json", "w") as file:
    json.dump(movies_with_nick, file, indent=4)
