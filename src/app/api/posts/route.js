import { executeQuery } from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const offset = (page - 1) * limit;
    const tagsParam = searchParams.get("tags");
    const search = searchParams.get("search");

    let query = "SELECT * FROM posts";
    let params = [];
    let conditions = [];

    if (tagsParam) {
      const parsedTags = tagsParam
        ? tagsParam.split(',').map(tag => tag.trim()).filter(Boolean)
        : [];      
      params.push(parsedTags);
      conditions.push(`tags && $${params.length}::text[]`);
    }

    if (search) {
      const keyword = `%${search}%`;
      const titleIndex = params.length + 1;
      const contentIndex = params.length + 2;
      params.push(keyword, keyword);
      conditions.push(`(title ILIKE $${titleIndex} OR content ILIKE $${contentIndex})`);
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
    const { title, content, tags, image_url } = await req.json();

    if (!title || !content) {
      return Response.json({ error: "Title and content are required" }, { status: 400 });
    }

    const parsedTags = tags
      ? tags.split(',').map(tag => tag.trim()).filter(Boolean)
      : [];

    const safeImageUrl = image_url?.trim() || null;

    const result = await executeQuery(
      "INSERT INTO posts (title, content, tags, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, content, parsedTags, safeImageUrl]
    );

    return Response.json(result[0]);
  } catch (error) {
    console.error("Database error:", error);
    return Response.json({ error: "Database error", details: error.message }, { status: 500 });
  }
}