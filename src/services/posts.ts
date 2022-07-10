import { LoadedPost } from "../interfaces/post";
import { fetchPost, fetchPosts } from "./blockchain";
import { fetchPostContent, getUrl } from "./ipfs";

export const loadPosts = async () => {
  const posts = await fetchPosts();
  const filteredPosts = posts.filter((post) => post.isPublished);
  const loadedPosts = await Promise.all(
    filteredPosts.map(async (post) => {
      const content = await fetchPostContent(post.contentHash);
      const imageUrl = getUrl(post.imageHash);
      return {
        id: post.id,
        title: post.title,
        content,
        imageUrl,
      } as LoadedPost;
    })
  );
  return loadedPosts;
};

export const loadPost = async (id: number) => {
  const post = await fetchPost(+id);
  const content = await fetchPostContent(post.contentHash);
  const imageUrl = getUrl(post.imageHash);
  const loadedPost = {
    id: post.id,
    title: post.title,
    content,
    imageUrl,
    isPublished: post.isPublished,
    author: post.author,
  } as LoadedPost;
  return {
    post: loadedPost,
    contentHash: post.contentHash,
    imageHash: post.imageHash,
  };
};
