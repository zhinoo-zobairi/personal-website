import { executeQuery } from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const tag = searchParams.get("tag");
    const offset = (page - 1) * limit;

    let query;
    let params = [];
    let paramCount = 1;

    if (tag) {
      query = "SELECT * FROM posts WHERE tags @> $1::text[] ORDER BY created_at DESC LIMIT $2 OFFSET $3";
      params = [[tag], limit, offset];
    } else {
      query = "SELECT * FROM posts ORDER BY created_at DESC LIMIT $1 OFFSET $2";
      params = [limit, offset]; 
    }

    const posts = await executeQuery(query, params);
    return Response.json(posts);
  } catch (error) {
    console.error("Database error:", error);
    return Response.json({ error: "Database error", details: error.message }, { status: 500 });
  }
}
export async function POST(req) {
  try {
    const { title, content, tags } = await req.json();

    if (!title || !content) {
      return Response.json({ error: "Title and content are required" }, { status: 400 });
    }

    const result = await executeQuery(
      "INSERT INTO posts (title, content, tags) VALUES ($1, $2, $3) RETURNING *",
      [title, content, tags || []]
    );

    return Response.json(result[0]);
  } catch (error) {
    return Response.json({ error: "Database error", details: error.message }, { status: 500 });
  }
}