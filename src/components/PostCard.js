'use client';

import Link from "next/link";
export default function PostCard({ post }) {
  const formattedDate = new Date(post.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const wordsPerMinute = 200;
  const wordCount = post.content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return (
    <Link href={`/posts/${post.id}`}>
    <div className="bg-white shadow-md rounded-xl p-6 mb-6 hover:shadow-lg transition-shadow duration-300 transition-transform duration-200 hover:scale-[1.01] hover:shadow-xl">
      <h2 className="text-2xl font-serif font-semibold tracking-tight text-gray-900">{post.title}</h2>
      <p className="text-sm text-gray-400">{formattedDate}</p>
      <p className="text-sm text-gray-400">{readTime} min read</p>
      <p className="text-gray-600 mb-4">{post.content.slice(0, 100)}...</p>
      <div className="flex flex-wrap gap-2">
        {post.tags.map(tag => (
          <span key={tag} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">#{tag}</span>
        ))}
      </div>
    </div>
    </Link>
  );
}