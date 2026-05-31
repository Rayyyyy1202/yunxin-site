import { NextRequest, NextResponse } from "next/server";
import { readManagedContentState } from "@/lib/managed-store";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const state = await readManagedContentState();
  const scope = request.nextUrl.searchParams.get("scope");
  const headers = {
    "Cache-Control": "no-store, no-cache, must-revalidate",
  };

  if (scope && scope in state) {
    return NextResponse.json(
      state[scope as keyof typeof state] ?? {},
      { headers },
    );
  }

  return NextResponse.json(state, { headers });
}
