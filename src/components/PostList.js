'use client';

import { useEffect, useState } from 'react';
import { useDebounce } from "@/hooks/useDebounce";


export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 750);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchPosts() {
      try {
        console.log("Fetching posts for:", { page, debouncedSearch });
        setLoading(true);
        const res = await fetch(
          `/api/posts?page=${page}&limit=5&search=${encodeURIComponent(debouncedSearch)}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted for:", { page, debouncedSearch });
        } else {
          console.error("Error fetching posts:", error);
          setLoading(false);
        }
      }
    }
    fetchPosts(); //fetch runs once with old page, then with the page=1, only if page!==1 in the first run
    return () => {
      controller.abort();
    };
  }, [page, debouncedSearch]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]); // Reset page to 1 when the user stopped typing after 750ms, meaning the debounced search term has changed

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