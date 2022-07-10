import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { LoadedPost } from "../../interfaces/post";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { FiEdit, FiSave, FiX } from "react-icons/fi";
import MarkdownEditor from "../../components/markdown-editor";
import { fetchPost, fetchPosts, updatePost } from "../../services/blockchain";
import { fetchPostContent, getUrl, update } from "../../services/ipfs";
import { AccountContext } from "../../context/account-context";
import { useRouter } from "next/router";
import cn from "classnames";
import Image from "next/image";

interface Props {
  post: LoadedPost;
  hashes: {
    content: string;
    image: string;
  };
}

interface Params extends ParsedUrlQuery {
  id: string;
}

const Page: NextPage<Props> = ({ post, hashes }) => {
  const [editMode, setEditMode] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [newImage, setNewImage] = useState<File | undefined>(undefined);
  const [newTitle, setNewTitle] = useState("");
  const [newIsPublished, setNewIsPublished] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );
  const [savingPost, setSavingPost] = useState(false);
  const { account } = useContext(AccountContext);
  const router = useRouter();

  useEffect(() => {
    if (!router.isFallback) {
      setNewContent(post.content);
      setNewTitle(post.title);
      setNewIsPublished(post.isPublished);
    }
  }, [post, router.isFallback]);

  useEffect(() => {
    if (!newImage) {
      setImagePreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(newImage);
    setImagePreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [newImage]);

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    setNewImage(e.target.files[0]);
  };

  const saveEdit = async () => {
    if (!account.address) {
      return;
    }

    const isContentUpdated = newContent.trim() !== post.content;
    const isImageUpdated = newImage && imagePreview !== post.imageUrl;
    const isTitleUpdated = post.title !== newTitle.trim();
    const isIsPublishedUpdated = post.isPublished !== newIsPublished;

    if (
      !isContentUpdated &&
      !isImageUpdated &&
      !isTitleUpdated &&
      !isIsPublishedUpdated
    ) {
      return;
    }

    setSavingPost(true);

    try {
      const [contentHash, imageHash] = await Promise.all([
        isContentUpdated
          ? await update(newContent.trim(), hashes.content)
          : hashes.content,
        isImageUpdated ? await update(newImage, hashes.image) : hashes.image,
      ]);
      await updatePost(
        {
          id: post.id,
          title: newTitle.trim(),
          contentHash,
          imageHash,
          isPublished: newIsPublished,
        },
        account.signer
      );
      await router.replace(router.asPath);
      cancelEdit();
    } catch (error) {
      console.log("Error on post update:", error);
      setSavingPost(false);
    }
  };

  const cancelEdit = () => {
    setEditMode(false);
    setNewContent(post.content);
    setNewImage(undefined);
    setNewTitle(post.title);
    setImagePreview(undefined);
    setSavingPost(false);
  };

  return (
    <div className="flex w-full justify-center">
      <Head>
        <title>{post.title} | Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {router.isFallback ? (
        <div className="flex w-full flex-col lg:max-w-2xl"><p>Loading...</p></div>
      ) : (
        <div className="flex w-full flex-col lg:max-w-2xl">
          <div className="flex flex-col">
            <div className="relative h-80 w-full">
              <Image
                alt="Cover image uploaded by user"
                src={editMode ? imagePreview || post.imageUrl : post.imageUrl}
                layout="fill"
                objectFit="cover"
              />
            </div>
            {editMode && (
              <>
                <label htmlFor="file-upload" className="btn mt-5">
                  Change cover image
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleImageSelect}
                  accept="image/*"
                />
              </>
            )}
          </div>

          <article className="prose mt-10 w-full max-w-none lg:prose-lg lg:max-w-2xl">
            {editMode ? (
              <h1>
                <input
                  type="text"
                  className="input input-bordered input-lg"
                  value={newTitle}
                  onInput={(e: ChangeEvent<HTMLInputElement>) =>
                    setNewTitle(e.target.value)
                  }
                />
              </h1>
            ) : (
              <>
                {!post.isPublished && (
                  <div className="not-prose">
                    <p className="mb-2 font-bold text-error">
                      Unpublished post
                    </p>
                  </div>
                )}
                <h1>{post.title}</h1>
              </>
            )}
            {editMode ? (
              <MarkdownEditor
                value={newContent}
                onChange={(e) => setNewContent(e)}
              />
            ) : (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {newContent}
              </ReactMarkdown>
            )}
          </article>

          {editMode && (
            <div className="mt-3 flex justify-end">
              <div className="form-control w-fit">
                <label className="label cursor-pointer">
                  <span className="label-text mr-4">Published</span>
                  <input
                    type="checkbox"
                    checked={newIsPublished}
                    onChange={() => setNewIsPublished(!newIsPublished)}
                    className="checkbox"
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      )}

      {post.author === account.address && (
        <div className="fixed bottom-8 right-8 lg:bottom-20 lg:right-20">
          {editMode ? (
            <div className="flex space-x-3">
              <button
                className={cn("btn btn-success btn-circle", {
                  loading: savingPost,
                })}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={saveEdit}
                disabled={savingPost}
              >
                {!savingPost && <FiSave size={16} />}
              </button>
              <button
                className="btn btn-error btn-circle"
                onClick={cancelEdit}
                disabled={savingPost}
              >
                <FiX size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditMode(!editMode)}
              className="btn btn-circle"
            >
              <FiEdit size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetchPosts();
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { id } = params!;
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
      props: {
        post: loadedPost,
        hashes: {
          content: post.contentHash,
          image: post.imageHash,
        },
      },
      revalidate: 30,
    };
  } catch (error) {
    return {
      notFound: true,
      revalidate: 30,
    };
  }
};

export default Page;
