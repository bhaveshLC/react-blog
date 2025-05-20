import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../appWrite/service";
import Button from "../../Components/Custom/Button/Button";

const Edit_Post = () => {
  const [post, setPost] = React.useState<any>(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPost = async () => {
      const postData = await service.getPost(slug || "");
      setPost(postData);
    };
    fetchPost();
  }, [slug, navigate]);
  return post ? (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const data = {
              title: formData.get("title") as string,
              content: formData.get("content") as string,
              status: "active",
            };
            await service.updatePost(post.$id, data);
            navigate(`/post/${post.$id}`);
          }}
        >
          <input
            type="text"
            name="title"
            defaultValue={post.title}
            className="border border-gray-300 rounded p-2 mb-4 w-full"
            placeholder="Title"
          />
          <textarea
            name="content"
            defaultValue={post.content}
            className="border border-gray-300 rounded p-2 mb-4 w-full"
            placeholder="Content"
          />
          <Button
            type="submit"
            className="bg-blue-500 text-white rounded p-2 w-full"
          >
            Update Post
          </Button>
        </form>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">No Post Found</h1>
    </div>
  );
};

export default Edit_Post;
