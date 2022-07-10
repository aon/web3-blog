import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, useEffect, useState } from "react";
import { FiSave } from "react-icons/fi";
import MarkdownEditor from "../components/markdown-editor";
import { upload } from "../services/ipfs";
import cn from "classnames";
import {
  createPost,
  getMumbaiScanLink,
  waitCreatePost,
} from "../services/blockchain";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AccountContext } from "../context/account-context";
import NewTabHref from "../components/new-tab-href";

const NewPost: NextPage = () => {
  const [post, setPost] = useState({
    content: "",
    title: "",
    image: undefined as File | undefined,
    isPublished: true,
  });
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );
  const [isUploadingPost, setIsUploadingPost] = useState(false);
  const [isMintingPost, setIsMintingPost] = useState(false);
  const [txHash, setTxHash] = useState("");
  const { account } = useContext(AccountContext);
  const router = useRouter();

  useEffect(() => {
    if (!post.image) {
      setImagePreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(post.image);
    setImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [post.image]);

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    setPost((prev) => ({ ...prev, image: e.target.files![0] }));
  };

  const isSaveReady =
    post.content && post.title && post.image && account.address;

  const handleSave = async () => {
    if (!isSaveReady) {
      return;
    }
    try {
      // Upload content to IPFS
      setIsUploadingPost(true);
      const [contentCid, imageCid] = await Promise.all([
        upload(post.content.trim()),
        upload(post.image!),
      ]);

      // Upload to blockchain
      const tx = await createPost(
        {
          title: post.title.trim(),
          contentHash: contentCid,
          imageHash: imageCid,
          isPublished: post.isPublished,
        },
        account.signer
      );
      setIsUploadingPost(false);

      // Wait mint
      setTxHash(tx.hash);
      setIsMintingPost(true);
      const postId = await waitCreatePost(tx);
      setIsMintingPost(false);

      // Redirect
      await router.push(`/post/${postId}`);
    } catch (error) {
      console.log("Error uploading post:", error);
      setIsUploadingPost(false);
      setIsMintingPost(false);
    }
  };

  return (
    <div className="flex w-full justify-center">
      <Head>
        <title>New Post | Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <input
        type="checkbox"
        id="minting-modal"
        className="modal-toggle"
        checked={isMintingPost}
        readOnly
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Uploading</h3>
          <p className="py-4">Your post is being posted to the blockchain!</p>
          <p>
            You&apos;ll be redirected when it&apos;s ready, click{" "}
            <NewTabHref className="link" href={getMumbaiScanLink(txHash)}>
              here
            </NewTabHref>
            to see it on polygonscan.
          </p>
          <div className="modal-action">
            <label
              htmlFor="minting-modal"
              className="btn"
              onClick={() => setIsMintingPost(!isMintingPost)}
            >
              Ok
            </label>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col lg:max-w-2xl">
        <div className="flex flex-col">
          {imagePreview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt="Uploaded cover image by user" src={imagePreview} />
          )}
          <label htmlFor="file-upload" className="btn mt-5">
            {post.image ? "Change cover image" : "Choose cover image"}
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleImageSelect}
            accept="image/*"
          />
        </div>

        <div className="mt-10 flex flex-col space-y-10">
          <h1>
            <input
              type="text"
              value={post.title}
              placeholder="Title"
              onInput={(e: ChangeEvent<HTMLInputElement>) =>
                setPost((prev) => ({ ...prev, title: e.target.value }))
              }
              className="input input-bordered input-lg w-full lg:w-auto"
            />
          </h1>
          <MarkdownEditor
            value={post.content}
            onChange={(e) => setPost((prev) => ({ ...prev, content: e }))}
          />
        </div>

        <div className="mt-3 flex justify-end">
          <div className="form-control w-fit">
            <label className="label cursor-pointer">
              <span className="label-text mr-4">Publish immediately</span>
              <input
                type="checkbox"
                checked={post.isPublished}
                onChange={() =>
                  setPost((prev) => ({
                    ...prev,
                    isPublished: !prev.isPublished,
                  }))
                }
                className="checkbox"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 right-8 lg:bottom-20 lg:right-20">
        {isSaveReady && (
          <button
            className={cn("btn btn-circle", { loading: isUploadingPost })}
            onClick={() => void handleSave()}
            disabled={isUploadingPost}
          >
            {!isUploadingPost && <FiSave size={16} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default NewPost;
