"use client";
import LayoutContainer from "../components/LayoutContainer";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";

// Define the Post type for strict typing
interface Post {
  id: string;
  title: string;
  content: string;
  inserted_at: string;
  user_id: string;
}

// PUBLIC_INTERFACE
export default function Home() {
  return (
    <LayoutContainer sidebar={<Sidebar />}>
      <HomeFeed />
    </LayoutContainer>
  );
}

// PUBLIC_INTERFACE
/**
 * Displays a list of posts fetched from Supabase, handles loading/error states.
 */
function HomeFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts from Supabase on mount
  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, content, inserted_at, user_id")
        .order("inserted_at", { ascending: false });

      if (error) {
        setError("Failed to fetch posts: " + (error.message || ""));
      } else {
        setPosts((data as Post[]) || []);
      }
      setLoading(false);
    }

    fetchPosts();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-[#1a1a1a]">Recent Posts</h2>
      <div className="rounded border bg-white p-6 shadow">
        {loading && <p className="text-gray-600">Loading posts...</p>}
        {error && (
          <p className="text-red-700 font-semibold mb-4">Error: {error}</p>
        )}
        {!loading && !error && posts.length === 0 && (
          <p className="text-lg text-gray-700">No posts yet.</p>
        )}
        {!loading && !error && posts.length > 0 && (
          <ul>
            {posts.map((post) => (
              <li key={post.id} className="mb-8 pb-6 border-b last:border-0 last:pb-0">
                <a href={`/post/${post.id}`}>
                  <h3 className="text-xl font-semibold mb-1 text-[#0070f3] hover:underline">{post.title}</h3>
                </a>
                <p className="text-gray-800 mb-1 line-clamp-2">{post.content.slice(0, 150)}{post.content.length > 150 ? "..." : ""}</p>
                <p className="text-xs text-gray-500">
                  Posted by <span className="font-mono">{post.user_id}</span> on{" "}
                  {new Date(post.inserted_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-2 text-gray-600 text-sm">
          <a href="/new" className="underline text-[#0070f3]">Create a new post</a>
        </p>
      </div>
    </div>
  );
}
