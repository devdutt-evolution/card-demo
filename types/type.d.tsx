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

type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
};

type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

type LikeObject = { userId: string; reactionType: string };

export type User = {
  _id: string;
  picture: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
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
  name: string;
  email: string;
  body: string;
  numberOfLikes: number;
  likedByUser: boolean;
  userLike?: LikeObject;
};
