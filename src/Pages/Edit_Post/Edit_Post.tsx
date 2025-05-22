import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../appWrite/service";
import RTE from "../../Components/RTE";
import { useForm } from "react-hook-form";
import Input from "../../Components/Custom/Input/Input";
import Select from "../../Components/Custom/Select/Select";
import { notify } from "../../config/Toast";

const Edit_Post = () => {
  const [post, setPost] = React.useState<any>(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      status: "active",
      image: null,
    },
  });
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await service.getPost(slug || "");
        if (postData && typeof postData !== "boolean") {
          setPost(postData);
          reset({
            title: postData.title,
            slug: postData.$id,
            content: postData.content,
            status: postData.status || "active",
          });
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [slug, reset]);

  const onSubmit = async (data: any) => {
    try {
      await service.updatePost(post.$id, data);
      notify("success", "Post Updated Successfully.");
      navigate(`/post/${post.$id}`);
    } catch (error: any) {
      notify("error", error.error.message);
      console.error("Error updating post:", error);
    }
  };

  return post ? (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden w-full max-w-2xl">
        <h2 className="text-2xl font-bold p-6 text-gray-900 dark:text-gray-100">
          Edit Post
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="space-y-2">
            <Input
              label="Title"
              type="text"
              id="title"
              {...register("title", { required: true })}
              className="block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-all duration-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Enter post title"
            />
          </div>
          <div className="space-y-2">
            <Select
              options={["active", "inactive"]}
              label="Status"
              className="mb-4"
              {...register("status", { required: true })}
            />
          </div>
          <div className="space-y-2">
            <RTE
              label="Content"
              name="content"
              control={control}
              defaultValue={post.content}
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate(`/post/${post.$id}`)}
              className="px-6 py-3 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 border border-gray-300 dark:border-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200 shadow-sm hover:shadow-md flex items-center"
            >
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4 text-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Post Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The post you're looking for doesn't exist or may have been removed.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200 w-full"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default Edit_Post;
