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

export type Post = {
  _id: string;
  title: string;
  body: string;
  userId: string;
  publishAt?: number;
  user?: User;
};
export type PostComment = {
  _id: string;
  title: string;
  body: string;
  userId: string;
  user?: User;
  publishAt?: number;
  comments: Comments;
};
export type Posts = Array<Post>;

export type Comment = {
  postId: string;
  _id: string;
  name: string;
  email: string;
  body: string;
};
export type Comments = Array<Comment>;
