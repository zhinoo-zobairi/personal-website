'use client';
import PostCard from "./PostCard";
import LoadingSpinner from "./LoadingSpinner";
import CategorySelector from "./CategorySelector";
import { useEffect, useState } from 'react';
import { useDebounce } from "@/hooks/useDebounce";


export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 750);
  const availableTags = ["AI", "Frontend", "Backend", "Cloud", "Database", "Security", "Finance"];
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function fetchPosts() {
      try {
        console.log("Fetching posts for:", { page, debouncedSearch, selectedTag});
        setLoading(true);
        const tagQuery = selectedTag ? `&tags=${selectedTag}` : "";
        const res = await fetch(
          `/api/posts?page=${page}&limit=5&search=${encodeURIComponent(debouncedSearch)}${tagQuery}`,
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
  }, [page, debouncedSearch, selectedTag]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]); // Reset page to 1 when the user stopped typing after 750ms, meaning the debounced search term has changed

  return (
    <div className="max-w-2xl mx-auto p-4">
      <input 
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border px-3 py-2 rounded mb-6 w-full"
      />
      <div className="mb-4">
        <CategorySelector
          tags={availableTags}
          selectedTag={selectedTag}
          onSelect={(tag) => setSelectedTag(tag)}
        />
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : posts.length === 0 ? (
        <p className="text-gray-500 text-center mt-8">No posts found.</p>
      ) : (
        <>
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
          <div className="flex justify-between mt-6">
            <button onClick={() => setPage(currentPage => Math.max(currentPage - 1, 1))}>Previous</button>
            <button onClick={() => setPage(currentPage => currentPage + 1)}>Next</button>
          </div>
        </>
      )}
    </div>
  );
}