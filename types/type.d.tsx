export type User = {
  id: number;
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
  id: number;
  title: string;
  body: string;
  userId: string;
  user?: User;
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
