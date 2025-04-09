import { returnJSON } from "@/utils/returnJSON";
import Fuse from "fuse.js";
import { NextRequest } from "next/server";

const fuseOptions = {
  keys: ["title", "genres", "nconst", "Poster.plot"],
  threshold: 0.36,
  includeMatches: true,
};

export async function GET(request: NextRequest) {
  const searchQuery = request.nextUrl.searchParams.get("search");
  const data = returnJSON();
  const fuse = new Fuse(data, fuseOptions);
  const searchResult = fuse.search(searchQuery?.toString() || "");
  console.log(searchResult.length);
  return Response.json(searchResult);
}
