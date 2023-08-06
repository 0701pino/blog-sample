import { PostData } from "../helper/get_top_contents";
import { MdAccessTime, MdUpdate } from "react-icons/md";
import Image from "next/image";
interface LatestPostsProps {
  latestPosts: PostData[];
}

const LatestPosts: React.FC<LatestPostsProps> = ({ latestPosts }) => {
  return (
    <div className="max-w-md mx-auto grid gap-6 lg:grid-cols-3 lg:max-w-7xl ">
      {latestPosts.map((item) => (
        <a
          key={item.slug}
          href={item.slug}
          className="flex flex-col rounded-lg bg-white overflow-hidden hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          <div className="flex flex-col-reverse">
            <div className="flex-1">
              <div className="p-3">
                <div className="flex space-x-4 items-center">
                  <div className="flex items-center space-x-2">
                    <MdAccessTime />
                    <p className="text-base text-gray-600">{item.createdAt}</p>
                  </div>
                  {item.updatedAt && item.createdAt !== item.updatedAt && (
                    <div className="flex items-center space-x-2">
                      <MdUpdate />
                      <p className="text-base text-gray-600">{item.updatedAt}</p>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                <p className="mt-3 text-base text-gray-600">
                  {item.description.length > 50
                    ? `${item.description.substring(0, 50)}...`
                    : item.description}
                </p>
              </div>
            </div>
            <div className="relative h-48 w-full object-cover sm:h-56">
              <Image
                src={item.image ? `/images/${item.image}` : "/images/no_image.png"}
                alt=""
                layout="fill"
                className="object-cover"
              />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default LatestPosts;
