import { executeQuery } from "@/lib/db";

export default async function PostPage({ params }) {
    const {id} = params;
    const posts = await executeQuery("SELECT * FROM posts WHERE id = $1", [id]);
    const post = posts[0];

    if (!post) {
        return <div className="text-center mt-20">Post not found.</div>;
    }
    return (
        <div className="max-w-2xl mx-auto px-6 py-16 text-white font-serif">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-sm text-gray-400 mb-4 font-sans
">Written on {new Date(post.created_at).toLocaleDateString()}</p>
          <p className="text-gray-300 mb-6 whitespace-pre-line font-sans
">{post.content}</p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
                            <span key={tag} className="bg-white text-black px-3 py-1 rounded-full text-sm">#{tag}</span>
            ))}
          </div>
          <div className="mt-8">
            <a href="/" className="inline-block bg-white text-black px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition">
            Back to all posts
            </a>
          </div>
        </div>
      );
}