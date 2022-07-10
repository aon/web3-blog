import { Post } from "../interfaces/post";
import { getContract } from "../utils/blockchain";
import { PostCreatedEvent } from "../../typechain/Blog";
import { ContractTransaction, Signer } from "ethers";

export const fetchPost = async (id: number): Promise<Post> => {
  const contract = getContract();
  const post = await contract.fetchPost(id);
  return {
    id: post.id.toNumber(),
    title: post.title,
    contentHash: post.contentHash,
    imageHash: post.imageHash,
    isPublished: post.isPublished,
    author: post.author,
  };
};

export const fetchPosts = async (): Promise<Post[]> => {
  const contract = getContract();
  const posts = await contract.fetchPosts();
  return posts.map((post) => ({
    id: post.id.toNumber(),
    title: post.title,
    contentHash: post.contentHash,
    imageHash: post.imageHash,
    isPublished: post.isPublished,
    author: post.author,
  }));
};

export const createPost = async (
  {
    title,
    contentHash,
    imageHash,
    isPublished,
  }: {
    title: string;
    contentHash: string;
    imageHash: string;
    isPublished: boolean;
  },
  signer: Signer
) => {
  const contract = getContract(signer);
  const tx = await contract.createPost(
    title,
    contentHash,
    imageHash,
    isPublished
  );
  return tx;
};

export const waitCreatePost = async (tx: ContractTransaction) => {
  const { events } = await tx.wait();
  if (!events || events.length === 0) {
    throw new Error("No events emitted");
  }
  const event = events[0] as PostCreatedEvent;
  if (event.event !== "PostCreated") {
    throw new Error("Unexpected event emitted");
  }
  return event.args.id.toNumber();
};

export const updatePost = async (
  {
    id,
    title,
    contentHash,
    imageHash,
    isPublished,
  }: {
    id: number;
    title: string;
    contentHash: string;
    imageHash: string;
    isPublished: boolean;
  },
  signer: Signer
) => {
  const contract = getContract(signer);
  const tx = await contract.updatePost(
    id,
    title,
    contentHash,
    imageHash,
    isPublished
  );
  return tx.hash;
};

export const getMumbaiScanLink = (hash: string) =>
  `https://mumbai.polygonscan.com/tx/${hash}`;
