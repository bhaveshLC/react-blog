import { Link } from "react-router-dom";
import service from "../appWrite/service";
import { useEffect } from "react";

interface PostCardProps {
  $id: string;
  title: string;
  content?: string;
  author?: string;
  featuredImage?: string;
  date?: string;
}

const PostCard = ({ $id, title, featuredImage }: PostCardProps) => {
  const imageUrl = service.getFilePreview(featuredImage || "");
  useEffect(() => {
    console.log("PostCard", featuredImage);
  }, [imageUrl]);
  return (
    <Link to={`/post/${$id}`}>
      <div className="transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden p-4">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              {title.length > 28 ? title.substring(0, 28) + "..." : title}
            </h2>
          </div>
          <div className="p-4">
            <p className="font-semibold text-blue-600">Read More...</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
