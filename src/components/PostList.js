'use client';

import { useEffect, useState } from 'react';

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      console.log("Fetching posts for:", { page, searchTerm });
      setLoading(true);
      const res = await fetch(`/api/posts?page=${page}&limit=5&search=${encodeURIComponent(searchTerm)}`);
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    }

    fetchPosts(
    );
  }, [page, searchTerm]);

  if (loading) return <p>Loading posts...</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border px-3 py-2 rounded mb-4 w-full"
      />
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content.slice(0, 100)}...</p>
          <div>
            {post.tags.map(tag => (
              <span key={tag}>#{tag} </span>
            ))}
          </div>
        </div>
      ))}

      <div>
        <button onClick={() => setPage(currentPage => Math.max(currentPage - 1, 1))}>Previous</button>
        <button onClick={() => setPage(currentPage => currentPage + 1)}>Next</button>
      </div>
    </div>
  );
}