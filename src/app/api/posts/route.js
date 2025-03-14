import { executeQuery } from "@/lib/db";

export async function GET() {
  try {
    const posts = await executeQuery("SELECT * FROM posts ORDER BY created_at DESC");
    return Response.json(posts);
  } catch (error) {
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