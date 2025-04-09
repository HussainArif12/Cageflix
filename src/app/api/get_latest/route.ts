export const dynamic = "force-static";
import { returnJSON } from "@/utils/returnJSON";

export async function GET() {
  const data = returnJSON()
    .filter((item) => item.startYear != "\\N" && item.titleType != "tvEpisode")
    .sort((a, b) => parseInt(b.startYear) - parseInt(a.startYear))
    .slice(0, 10);

  return Response.json(data);
}
