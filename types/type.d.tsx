declare module "next-auth" {
  interface Session {
    user: {
      token: string;
      email: string;
      name: string;
      id: string;
      picture: string;
    };
  }
  interface User {
    email: string;
    name: string;
    token: string;
    picture?: string;
  }
}

type LikeObject = { userId: string; reactionType: string };

export type User = {
  _id: string;
  email: string;
  username: string;
  name: string;
  picture: string;
  phone: string;
};

export type Post = {
  _id: string;
  title: string;
  body: string;
  userId: string;
  numberOfLikes: number;
  commentCount: number;
  likedByUser: boolean;
  userLike?: LikeObject;
  publishAt?: number;
  user?: User;
};

export type PostComment = {
  comments: Comment[];
} & Post;

export type Comment = {
  _id: string;
  postId: string;
  userId: string;
  username: string;
  body: string;
  numberOfLikes: number;
  likedByUser: boolean;
  userLike?: LikeObject;
};
