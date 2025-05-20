import React, { useEffect, useState } from "react";
import service from "../../appWrite/service";
import PostCard from "../../Components/postCard";

const Posts = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await service.getPosts();
        console.log("📦 API response:", res);
        if (res && res.documents) {
          setPosts(res.documents);
        }
      } catch (error) {
        console.error("❌ Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-5">Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
    </div>
  );
};

export default Posts;
