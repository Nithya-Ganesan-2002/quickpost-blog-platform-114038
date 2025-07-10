"use client";
import LayoutContainer from "../../components/LayoutContainer";
import Sidebar from "../../components/Sidebar";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "../../supabase/supabaseClient";

// Dynamically import the Markdown editor to avoid SSR issues
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), { ssr: false });
import "react-markdown-editor-lite/lib/index.css";
import ReactMarkdown from "react-markdown";

// PUBLIC_INTERFACE
export default function NewPostPage() {
  return (
    <LayoutContainer sidebar={<Sidebar />}>
      <div className="max-w-2xl w-full bg-white p-6 rounded border shadow">
        <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
        <PostEditor />
      </div>
    </LayoutContainer>
  );
}

// PUBLIC_INTERFACE
/**
 * Renders the post editor UI with title/content, handles submission to Supabase, and provides user feedback.
 */
function PostEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();

  const handleEditorChange = ({ text }: { text: string }) => {
    setContent(text);
  };

  // PUBLIC_INTERFACE
  /**
   * Handles submission: inserts post into Supabase 'posts' table.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }
    setLoading(true);

    // Get current user (must be authenticated!)
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError("You must be logged in to create a post.");
      setLoading(false);
      return;
    }

    // Insert into Supabase
    const { error: insertError } = await supabase.from("posts").insert([
      {
        title: title.trim(),
        content,
        user_id: user.id
      }
    ]);

    if (insertError) {
      setError(insertError.message);
    } else {
      setSuccess("Post created successfully!");
      // Optionally, redirect after a short delay
      setTimeout(() => {
        router.push("/");
      }, 1200);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="block mb-3">
        <span className="font-semibold">Title</span>
        <input
          className="mt-1 w-full border rounded px-3 py-2"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter a catchy post title..."
          required
          disabled={loading}
        />
      </label>
      <MdEditor
        value={content}
        style={{ height: "350px", borderRadius: "4px" }}
        renderHTML={(text: string) => <ReactMarkdown>{text}</ReactMarkdown>}
        onChange={handleEditorChange}
        placeholder="Write your post content here using Markdown..."
        view={{ menu: true, md: true, html: true }}
        config={{
          canView: {
            menu: true,
            md: true,
            html: true,
            fullScreen: true,
            hideMenu: true,
          },
        }}
      />
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Preview</h3>
        <div className="prose bg-gray-50 p-4 rounded border">
          <ReactMarkdown>{content || "Nothing to preview yet..."}</ReactMarkdown>
        </div>
      </div>
      {error && <p className="mt-4 text-red-700 font-semibold">{error}</p>}
      {success && <p className="mt-4 text-green-700 font-semibold">{success}</p>}
      <button
        type="submit"
        className={`mt-6 w-full bg-[#0070f3] text-white font-semibold px-4 py-2 rounded flex items-center justify-center ${
          loading ? "opacity-60 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Publish Post"}
      </button>
    </form>
  );
}
