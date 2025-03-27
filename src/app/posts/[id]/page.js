import { executeQuery } from "@/lib/db";

export default async function PostPage({ params }) {
    const {id} = params;
    const posts = await executeQuery("SELECT * FROM posts WHERE id = $1", [id]);
    const post = posts[0];

    if (!post) {
        return <div className="text-center mt-20">Post not found.</div>;
    }
    return (
        <div className="max-w-2xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-700 mb-6">{post.content}</p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">#{tag}</span>
            ))}
          </div>
        </div>
      );
}