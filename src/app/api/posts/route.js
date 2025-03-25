import { executeQuery } from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const offset = (page - 1) * limit;
    const tagsParam = searchParams.get("tags");

    let query = "SELECT * FROM posts";
    let params = [];
    let conditions = [];

    if (tagsParam) {
      const tagList = tagsParam.split(",").map(tag => tag.trim());
      params.push(tagList);
      conditions.push(`tags && $${params.length}::text[]`);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

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
    console.error("Database error:", error);
    return Response.json({ error: "Database error", details: error.message }, { status: 500 });
  }
}