"use client";
import LayoutContainer from "../../components/LayoutContainer";
import Sidebar from "../../components/Sidebar";
import React, { useState } from "react";
import dynamic from "next/dynamic";

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

function PostEditor() {
  const [content, setContent] = useState<string>("");

  const handleEditorChange = ({ text }: { text: string }) => {
    setContent(text);
  };

  return (
    <div>
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
    </div>
  );
}
