import { returnJSON } from "@/utils/returnJSON";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, context: any) {
  const { genre } = await context.params;
  const limitQuery = parseInt(request.nextUrl.searchParams.get("limit") || "0");
  const data = returnJSON();

  const genreResult = data.filter((item) => item.genres.includes(genre));

  if (limitQuery > 0) {
    const sortedResult = genreResult
      .sort((a, b) => b.averageRating - a.averageRating)
      .filter(
        (item) =>
          item.titleType != "tvEpisode" &&
          item.titleType != "tvSpecial" &&
          item.titleType != "video" &&
          item.titleType != "short"
      );

    return Response.json(sortedResult);
  }
  return Response.json(genreResult);
}
