import { executeQuery } from "@/lib/db";

export async function GET() {
  try {
    const result = await executeQuery("SELECT NOW()");
    return Response.json({ success: true, timestamp: result[0].now });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}