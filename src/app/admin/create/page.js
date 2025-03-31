'use client';

import { useState } from "react";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, content, tags, image_url: imageUrl })
      });

      if (!res.ok) {
        throw new Error("Failed to create post");
      }

      alert("Post created successfully!");
      setTitle("");
      setContent("");
      setTags("");
      setImageUrl("");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 text-white font-serif">
      <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
        id="title"
        name="title"
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
        id="content"
        name="content"
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600 h-40"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
        id="tags"
        name="tags"
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <input
        id="image_url"
        name="image_url"
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <button
          type="submit"
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}