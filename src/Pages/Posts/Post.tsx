import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import service from "../../appWrite/service";
import Container from "../../Components/Container/Container";
import Button from "../../Components/Custom/Button/Button";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import ConfirmBox from "../../Components/Custom/ConfirmationBox/ConfirmBox";

const Post = () => {
  interface PostType {
    $id: string;
    userId: string;
    title: string;
    content: string;
    featuredImage: string;
    $createdAt?: string;
  }

  const [post, setPost] = useState<PostType | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state: any) => state.auth.user);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post: any) => {
        if (post) {
          const formattedPost: PostType = {
            $id: post.$id,
            userId: post.userId,
            title: post.title,
            content: post.content,
            featuredImage: post.featuredImage,
          };
          setPost(formattedPost);
        } else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    if (post) {
      service.deletePost(post.$id).then((status) => {
        if (status) {
          service.deleteFile(post.featuredImage);
          navigate("/");
        }
      });
    }
  };

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    setShowConfirmation(false);
    deletePost();
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return post ? (
    <div className="py-8 bg-gray-50 dark:bg-gray-800 rounded-md min-h-screen">
      {showConfirmation && (
        <ConfirmBox
          isOpen={showConfirmation}
          message="Are you sure you want to delete this post? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          confirmColor="red"
        />
      )}
      <Container>
        <div className="w-full max-w-4xl mx-auto">
          <div className="w-full mb-8 relative group rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
            <img
              src={service.getFilePreview(post.featuredImage) || ""}
              alt={post.title}
              className="w-full h-auto max-h-[500px] object-cover rounded-xl transition-opacity duration-300 hover:opacity-95"
              loading="lazy"
            />

            {isAuthor && (
              <div className="absolute right-4 top-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button
                    bgColor="bg-emerald-600 hover:bg-emerald-700"
                    className="px-4 py-2 flex items-center text-white rounded-lg shadow-md transition-colors"
                  >
                    <PencilIcon className="w-4 h-4 mr-1 inline" />
                    Edit
                  </Button>
                </Link>
                <Button
                  bgColor="bg-red-600 hover:bg-red-700"
                  onClick={handleDeleteClick} // Show confirmation box on click
                  className="px-4 py-2 flex items-center text-white rounded-lg shadow-md transition-colors"
                >
                  <TrashIcon className="w-4 h-4 mr-1 inline" />
                  Delete
                </Button>
              </div>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
            {post.title}
          </h1>

          <div className="prose prose-lg max-w-none prose-headings:text-gray-800 dark:prose-headings:text-gray-100 prose-a:text-blue-600 hover:prose-a:text-blue-700 dark:prose-a:text-blue-400 dark:hover:prose-a:text-blue-500 prose-img:rounded-xl prose-img:shadow-md prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-600 prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-800 prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:rounded dark:text-white">
            {parse(post.content)}
          </div>

          <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
            {post.$createdAt && (
              <p>Posted on: {new Date(post.$createdAt).toLocaleDateString()}</p>
            )}
          </div>
        </div>
      </Container>
    </div>
  ) : null;
};

export default Post;
