import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { LoadedPost } from "../interfaces/post";
import { fetchPosts } from "../services/blockchain";
import { fetchPostContent, getUrl } from "../services/ipfs";
import removeMd from "remove-markdown";

interface Props {
  posts: LoadedPost[];
}

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col lg:flex-row lg:flex-wrap">
        {posts.map((post) => {
          return (
            <Link href={`/post/${post.id}`} key={post.id}>
              <a>
                <div className="card mb-12 h-[364px] w-full bg-base-200 transition lg:mr-8 lg:w-96 lg:shadow-xl lg:hover:-translate-y-2">
                  <Image
                    src={post.imageUrl}
                    alt=""
                    width={400}
                    height={225}
                    objectFit="cover"
                  />
                  <div className="card-body">
                    <h2 className="card-title">{post.title}</h2>
                    <p className="line-clamp-2">{removeMd(post.content)}</p>
                  </div>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
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
  return { props: { posts: loadedPosts }, revalidate: 30 };
};

export default Home;
