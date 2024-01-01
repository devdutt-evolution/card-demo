export type Post = {
  id?: number;
  title?: string;
  body?: string;
};
export type Posts = [Post];

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};
export type Comments = [Comment];

