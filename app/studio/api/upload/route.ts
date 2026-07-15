import { NextRequest, NextResponse } from "next/server";
import { getImagesBucket } from "@/lib/db";

export const runtime = "edge";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
  }

  const extension = file.name.includes(".")
    ? file.name.split(".").pop()
    : file.type.split("/").pop();
  const key = `${crypto.randomUUID()}.${extension}`;

  const bucket = getImagesBucket();
  await bucket.put(key, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type },
  });

  return NextResponse.json({ url: `/api/images/${key}` });
}
