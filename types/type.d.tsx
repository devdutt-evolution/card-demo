declare module "next-auth" {
  interface Session {
    user: {
      token: string;
    };
  }
  interface User {
    email: string;
    name: string;
    token: string;
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

export type User = {
  _id: string;
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
  publishAt?: number;
  user?: User;
};
export type PostComment = {
  _id: string;
  title: string;
  body: string;
  userId: string;
  user?: User;
  numberOfLikes: number;
  likedByUser: boolean;
  publishAt?: number;
  comments: Comments;
  commentCount: number;
};
export type Comment = {
  postId: string;
  _id: string;
  name: string;
  email: string;
  body: string;
  numberOfLikes: number;
  likedByUser: boolean;
};
export type Posts = Array<Post>;
export type Comments = Array<Comment>;
