import LayoutContainer from "../../components/LayoutContainer";
import Sidebar from "../../components/Sidebar";

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
  // Placeholder for markdown editing UI to be implemented.
  return (
    <div>
      <textarea
        className="w-full min-h-[160px] border rounded p-3 mb-4 font-mono"
        placeholder="Write your post in Markdown..."
        disabled
      />
      <button className="bg-[#0070f3] px-6 py-2 text-white font-semibold rounded opacity-70 cursor-not-allowed" disabled>
        Publish (coming soon)
      </button>
      <div className="text-gray-400 mt-2">
        Markdown support, preview, and publish will be implemented next.
      </div>
    </div>
  );
}
