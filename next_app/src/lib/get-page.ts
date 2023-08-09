import { PostData } from "@/types/post-data";
import { getPageContents } from "./get-contents";

export async function getPage(page: number): Promise<{ pagePosts: PostData[]; maxPage: number }> {
  const data = await getPageContents(page);

  // console.log("data", data);
  return data;
}
