export type Post = {
  id: number;
  title: string;
  body: string;
};
export type Posts = Array<Post>;

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};
export type Comments = Array<Comment>;
