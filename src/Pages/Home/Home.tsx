import React, { useCallback, useEffect, useState } from "react";
import service from "../../appWrite/service";
import PostCard from "../../Components/postCard";
import Pagination from "../../Components/Pagination/Pagination";
import Filter from "../../Components/Filter/Filter";
import Loader from "../../Components/Custom/Loader/Loader";
import { useSelector } from "react-redux";

const Home = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const filter = useSelector((state: any) => state.filter);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const fetchPosts = useCallback(async () => {
    try {
      const res = await service.getPosts([], filter);
      if (res && res.documents) {
        setPosts(res.documents);
        const pages = Math.max(1, Math.ceil(res.total / filter.limit));
        setTotalPages(pages);
      }
    } catch (error) {
      console.error(" Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="container mx-auto px-4 ">
      <div className="text-center mb-2">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          All Articles
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse through our collection of articles
        </p>
      </div>
      <Filter />

      {loading ? (
        <Loader />
      ) : posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-4">
            {posts.map((post) => (
              <PostCard
                key={post.$id}
                $id={post.$id}
                title={post.title}
                content={post.content}
                author={post.author}
                featuredImage={post.featuredImage}
                date={post.date}
              />
            ))}
          </div>

          <div className="flex justify-center">
            <Pagination currentPage={filter.page} totalPages={totalPages} />
          </div>
        </>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">
            No posts found
          </h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
