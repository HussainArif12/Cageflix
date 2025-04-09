export const dynamic = "force-static";
import { returnJSON } from "@/utils/returnJSON";

export async function GET() {
  const data = returnJSON();

  return Response.json(data);
}
