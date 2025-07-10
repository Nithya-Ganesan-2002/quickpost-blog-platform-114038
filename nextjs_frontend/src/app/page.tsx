import LayoutContainer from "../components/LayoutContainer";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <LayoutContainer sidebar={<Sidebar />}>
      <HomeFeed />
    </LayoutContainer>
  );
}

// Entry placeholder for Home Feed component
function HomeFeed() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-[#1a1a1a]">Recent Posts</h2>
      <div className="rounded border bg-white p-6 shadow">
        <p className="text-lg text-gray-800">
          Blog posts and comments will display here in real time.
        </p>
        <p className="mt-2 text-gray-600 text-sm">
          <a href="/new" className="underline text-[#0070f3]">Create a new post</a>
        </p>
      </div>
    </div>
  );
}
