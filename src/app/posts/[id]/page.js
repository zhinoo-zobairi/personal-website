import { executeQuery } from "@/lib/db";

export default async function PostPage(context) {
  const params = context.params;
  const posts = await executeQuery("SELECT * FROM posts WHERE id = $1", [params.id]);
  const post = posts[0];

    if (!post) {
        return <div className="text-center mt-20">Post not found.</div>;
    }
    return (
      <div className="flex text-center items-center justify-center">
        <div className="max-w-3xl mx-auto px-6 py-16 text-white">
          {post.image_url && (
            <img
              src={post.image_url}
              alt={`Image for ${post.title}`}
              className="rounded-xl mb-8 w-full object-cover max-h-96 shadow-lg"
            />
          )}
          <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4 leading-tight font-serif">{post.title}</h1>
          <p className="text-sm text-gray-400 mb-4 font-sans italic font-serif">Written on {new Date(post.created_at).toLocaleDateString()}</p>
          <p className="text-gray-300 mb-8 whitespace-pre-line font-sans leading-relaxed font-serif">{post.content}</p>
</div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
                <span key={tag} className="bg-white text-black px-3 py-1 rounded-full text-sm shadow-sm font-serif">#{tag}</span>
            ))}
          </div>
          <div className="mt-8">
            <a href="/" className="font-serif inline-block bg-white text-black px-5 py-2 rounded-full text-sm hover:bg-gray-200 transition cusror-pointer">
            Back to all posts
            </a>
          </div>
        </div></div>
      );
}