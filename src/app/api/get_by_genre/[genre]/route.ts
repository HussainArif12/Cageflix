import { returnJSON } from "@/utils/returnJSON";
import { NextRequest } from "next/server";

export async function GET(_: NextRequest, context: any) {
  const { genre } = await context.params;

  const data = returnJSON();
  const genreResult = data.filter((item) => item.genres.includes(genre));
  return Response.json(genreResult);
}
