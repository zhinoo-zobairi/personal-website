import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function AdminPage() {
  const { userId } = auth();
  const allowedUserId = process.env.ADMIN_USER_ID;
  if (!userId || userId !== allowedUserId) {
    return (
      <div className="text-center mt-32 text-white font-serif">
        <h1 className="text-3xl font-bold mb-6">Welcome! From here you can manage your posts.</h1>
        <Link href="/admin/create">
          <button className="bg-white text-black px-5 py-1 rounded-full hover:bg-gray-200 transition font-medium mt-3">
            + Create New Post
          </button>
        </Link>
      </div>
    );
  }
}
