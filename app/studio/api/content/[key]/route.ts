import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { setContent } from "@/lib/content";
import { ContentKey, SiteContent } from "@/lib/types";
import { defaultContent } from "@/lib/defaults";

export const runtime = "edge";

const VALID_KEYS = Object.keys(defaultContent) as ContentKey[];

export async function PUT(
  req: NextRequest,
  { params }: { params: { key: string } }
) {
  const key = params.key as ContentKey;

  if (!VALID_KEYS.includes(key)) {
    return NextResponse.json({ error: "Unknown content key" }, { status: 400 });
  }

  const body = await req.json();
  await setContent(key, body as SiteContent[typeof key]);
  revalidatePath("/");

  return NextResponse.json({ ok: true });
}
