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
      <div className="bg-white shadow-md rounded-lg overflow-hidden p-4">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        </div>
        <div className="p-4">
          <p className="text-gray-600">Read More</p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
