import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import service from "../../appWrite/service";
import PostCard from "../../Components/postCard";
const Home = () => {
  const isLoggedIn = useSelector((state: any) => state.status);
  const [posts, setPosts] = useState<any>([]);
  useEffect(() => {
    service
      .getPosts()
      .then((res: any) => {
        setPosts(res.documents);
      })
      .catch((err: any) => {
        console.error("Error fetching posts:", err);
      });
  }, []);
  return posts.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post: any) => (
        <PostCard
          $id={post.$id}
          key={post.$id}
          title={post.title}
          featuredImage={post.featuredImage}
          content={post.content}
          author={post.author}
          date={post.date}
        />
      ))}
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl font-bold text-center my-5">
        {isLoggedIn ? "No posts available" : "Please login to see posts"}
      </h1>
    </div>
  );
};

export default Home;
