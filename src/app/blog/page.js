import Head from "next/head";
import Image from "next/image";
import BlogCard from "../../components/BlogCard";
import { getPosts } from "@/lib/wp";

export default async function BlogPage() {
  let blogs = [];
  let error = null;

  try {
    // Fetch all posts from WordPress
    blogs = await getPosts({
      fetchAll: true, // This will fetch all posts using pagination
      orderby: 'date',
      order: 'desc'
    });
  } catch (err) {
    console.error('Error fetching blog posts:', err);
    error = err.message;
    // Fallback to empty array if WordPress is not available
    blogs = [];
  }


  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Blog - Foiling Tips & Gear Reviews</title>
      </Head>

      <header className="relative h-[280px] md:h-[380px] w-full">
        <Image
          src="/images/blogs/paraglider.png"
          alt="Paraglider"
          fill
          className="object-cover brightness-100"
          quality={100}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-[70px] font-bold mt-3">Blog</h1>
          <p className="mt-2 text-[18px] text-white font-[750] max-w-2xl px-6">
            Discover foiling tips, industry information and gear reviews for riders of all levels.
          </p>
        </div>
      </header>

      <main className="w-full px-2 sm:px-4 md:px-6 py-10">
        {error && (
          <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <p>Error loading blog posts: {error}</p>
            <p className="text-sm mt-2">Please check your WordPress configuration.</p>
          </div>
        )}

        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">No blog posts found</h2>
            <p className="text-gray-500">
              {error ? 'There was an error loading the blog posts.' : 'Check back soon for new content!'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
