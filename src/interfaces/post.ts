export interface Post {
  id: number;
  title: string;
  contentHash: string;
  imageHash: string;
  isPublished: boolean;
  author: string;
}

export type PostContent = string;

export interface LoadedPost {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  isPublished: boolean;
  author: string;
}
