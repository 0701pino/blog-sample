import { PostData } from "@/types/post-data";
import { MdAccessTime, MdUpdate } from "react-icons/md";
import Image from "next/image";
import { formatDate } from "@/lib/util";

interface PostListProps {
  posts: PostData[];
}

const PostList: React.FC<PostListProps> = ({ posts: posts }) => {
  return (
    <div className="mx-auto grid gap-6 lg:grid-cols-3 ">
      {posts.map((item) => (
        <a
          key={item.slug}
          href={"/post/" + item.slug}
          className="flex flex-col rounded-lg bg-white overflow-hidden hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          style={{ height: "auto" }}
        >
          <div className="flex flex-col-reverse" style={{ height: "auto" }}>
            <div className="flex-1">
              <div className="p-3">
                <div className="flex space-x-4 items-center">
                  <div className="flex items-center space-x-2">
                    <MdAccessTime />
                    <p className="text-sm text-gray-600">{formatDate(item.createdAt)}</p>
                  </div>
                  {item.updatedAt && item.createdAt !== item.updatedAt && (
                    <div className="flex items-center space-x-2">
                      <MdUpdate />
                      <p className="text-sm text-gray-600">{formatDate(item.updatedAt)}</p>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                <p className="mt-3 text-base text-gray-600">
                  {item.description && item.description?.length > 50
                    ? `${item.description?.substring(0, 50)}...`
                    : item.description}
                </p>
              </div>
            </div>
            <div className="relative w-full">
              <Image
                src={item.image ? `/images/${item.image}` : "/images/no-image.png"}
                alt=""
                className="object-cover w-full"
                layout="responsive"
                width={720}
                height={378}
              />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default PostList;
