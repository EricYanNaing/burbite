import type { NextRequest } from "next/server";
import { getShops } from "@/lib/data/shop";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") ?? "";
  const page = Number.parseInt(
    request.nextUrl.searchParams.get("page") ?? "1",
    10,
  );
  const limit = Number.parseInt(
    request.nextUrl.searchParams.get("limit") ?? "3",
    10,
  );
  const safePage = Number.isFinite(page) && page > 0 ? page : 1;
  const safeLimit =
    Number.isFinite(limit) && limit > 0 ? Math.min(limit, 6) : 3;
  const items = await getShops();
  const startIndex = (safePage - 1) * safeLimit;
  const pageItems = items.slice(startIndex, startIndex + safeLimit);
  const hasMore = startIndex + safeLimit < items.length;

  return Response.json({
    items: pageItems,
    total: items.length,
    query,
    page: safePage,
    limit: safeLimit,
    hasMore,
    nextPage: hasMore ? safePage + 1 : null,
  });
}
