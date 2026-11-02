import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { notifyIndexNow } from "@/lib/indexing/indexnow";

interface RevalidateByPath {
  type: "path";
  path: string | string[];
  notify?: boolean;
}

interface RevalidateByTag {
  type: "tag";
  tag: string | string[];
  paths?: string[];
  notify?: boolean;
}

interface RevalidateAll {
  type: "all";
  notify?: boolean;
  paths?: string[];
}

type RevalidatePayload = RevalidateByPath | RevalidateByTag | RevalidateAll;

interface RevalidateResponse {
  success: boolean;
  revalidated: string[];
  notified: boolean;
  notifiedUrls?: number;
  error?: string;
  timestamp: string;
}

function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.REVALIDATION_SECRET;
  if (!secret) return false;

  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  return token === secret;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const timestamp = new Date().toISOString();

  if (!isAuthorized(request)) {
    return NextResponse.json(
      {
        success: false,
        error: "Unauthorized — invalid or missing token",
        timestamp,
      },
      { status: 401 },
    );
  }

  let payload: RevalidatePayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid JSON body",
        timestamp,
      },
      { status: 400 },
    );
  }

  if (!payload.type) {
    return NextResponse.json(
      {
        success: false,
        error: 'Missing required field: "type" ("path" | "tag" | "all")',
        timestamp,
      },
      { status: 400 },
    );
  }

  const revalidated: string[] = [];
  let notifyPaths: string[] = [];
  const shouldNotify = payload.notify !== false;

  try {
    if (payload.type === "path") {
      const paths = Array.isArray(payload.path) ? payload.path : [payload.path];
      for (const path of paths) {
        revalidatePath(path);
        revalidated.push(`path:${path}`);
      }
      notifyPaths = paths;
    } else if (payload.type === "tag") {
      const tags = Array.isArray(payload.tag) ? payload.tag : [payload.tag];
      for (const tag of tags) {
        revalidateTag(tag, "max");
        revalidated.push(`tag:${tag}`);
      }
      notifyPaths = payload.paths ?? [];
    } else if (payload.type === "all") {
      revalidatePath("/", "layout");
      revalidated.push("all:layout");
      notifyPaths = payload.paths ?? [];
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Unknown revalidation type",
          timestamp,
        },
        { status: 400 },
      );
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Revalidation failed";

    return NextResponse.json(
      {
        success: false,
        revalidated,
        notified: false,
        error: message,
        timestamp,
      },
      { status: 500 },
    );
  }

  let notified = false;
  let notifiedUrls = 0;

  if (shouldNotify && notifyPaths.length > 0) {
    try {
      const result = await notifyIndexNow(notifyPaths);
      notified = result.success;
      notifiedUrls = result.urlsSubmitted;
    } catch {
      // IndexNow failure does not fail the primary revalidation response
    }
  }

  const response: RevalidateResponse = {
    success: true,
    revalidated,
    notified,
    ...(notifiedUrls > 0 && { notifiedUrls }),
    timestamp,
  };

  return NextResponse.json(response, { status: 200 });
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    {
      status: "ok",
      configured: {
        revalidationSecret: !!process.env.REVALIDATION_SECRET,
        indexNowKey: !!process.env.INDEXNOW_API_KEY,
      },
      timestamp: new Date().toISOString(),
    },
    { status: 200 },
  );
}
