import { executeQuery } from "@/lib/db";
import { PostSchema } from "@/validators/post";
import { auth } from "@clerk/nextjs/server";
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
    return Response.json({ error: "Internal Server Error"}, { status: 500 });
  }
}

export async function POST(req) {
    const { userId } = auth();
    const allowedUserId = process.env.ADMIN_USER_ID;
    if (!userId || userId !== allowedUserId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
  try {
    let validated;
    try {
        validated = PostSchema.parse(await req.json());
    } catch (error) {
        return Response.json(
            { error: "Invalid input", details: error.errors },
            { status: 400 }
        );
    }

const { title, content, tags, image_url } = validated;

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
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}