import { PostData } from "@/types/post-data";
import { MdAccessTime, MdUpdate } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/util";
import { getImageAttributes } from "@/lib/get-contents";
import { BASE_PATH } from "@/lib/config";

interface PostListProps {
  posts: PostData[];
}

const PostList: React.FC<PostListProps> = ({ posts: posts }) => {
  return (
    <div className="mx-auto grid gap-6 lg:grid-cols-3 ">
      {posts.map((item) => {
        const { imageSrc, imageSize } = getImageAttributes(item.emoji, item.image);

        return (
          <>
            <Link href={"/post/" + item.slug} passHref>
              <div
                key={item.slug}
                className="flex flex-col rounded-lg bg-white overflow-hidden hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 cursor-pointer"
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
                  <div className="relative w-full flex justify-center">
                    <Image
                      src={`${BASE_PATH}${imageSrc}`}
                      alt=""
                      className="object-cover w-full"
                      width={1200}
                      height={630}
                      style={{
                        width: `${imageSize}`,
                        height: "auto",
                      }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </>
        );
      })}
    </div>
  );
};

export default PostList;
