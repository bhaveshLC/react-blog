import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import service from "../../appWrite/service";
import PostCard from "../../Components/postCard";
import Loader from "../../Components/Custom/Loader/Loader";
import { Link } from "react-router-dom";
const Posts = () => {
  const userData = useSelector((state: any) => state.auth.user);
  const [posts, setPosts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    service
      .getMyPosts(userData.$id)
      .then((res: any) => {
        setPosts(res.documents);
      })
      .catch((err: any) => {
        console.error("Error fetching posts:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <>
      {loading && <Loader />}
      <div className="container mx-auto px-4 py-8 ">
        <div className=" mb-10">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            My Posts
          </h1>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2   pt-10 lg:grid-cols-3 gap-4">
              {posts.map((post: any) => (
                <PostCard
                  $id={post.$id}
                  key={post.$id}
                  title={post.title}
                  featuredImage={post.featuredImage}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center min-h-[60vh]  rounded-lg mx-4 p-8 text-center">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  No posts available
                </h1>
                <p className="text-gray-500 dark:text-gray-400 my-2">
                  Create your first post to get started!
                </p>
                <p className=" dark:text-gray-400">
                  Click on{"  "}
                  <Link
                    to="/create-post"
                    className="text-blue-500 underline italic"
                  >
                    Add Post
                  </Link>
                  {"  "}
                  to create your first one.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Posts;
