import { NextResponse } from "next/server";
import { generateLayoutFromPrompt } from "@/lib/generateLayoutFromPrompt";
import { layoutNodeSchema } from "@/lib/schema";

export async function POST(request: Request) {
  const body = await request.json();
  const prompt = String(body?.prompt ?? "");

  const layout = generateLayoutFromPrompt(prompt);
  const parsed = layoutNodeSchema.safeParse(layout);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Generated layout failed schema validation.",
        issues: parsed.error.issues
      },
      { status: 400 }
    );
  }

  return NextResponse.json(parsed.data);
}
