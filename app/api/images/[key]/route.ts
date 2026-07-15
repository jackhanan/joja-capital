import { NextRequest, NextResponse } from "next/server";
import { getImagesBucket } from "@/lib/db";

export const runtime = "edge";

export async function GET(
  _req: NextRequest,
  { params }: { params: { key: string } }
) {
  const bucket = getImagesBucket();
  const object = await bucket.get(params.key);

  if (!object) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "public, max-age=31536000, immutable");

  return new NextResponse(object.body, { headers });
}
