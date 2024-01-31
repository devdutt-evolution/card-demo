import { notFound, redirect } from "next/navigation";
// process.env.NEXT_PUBLIC_URL_BACKEND;

export class FetchResponse<T> {
  res: Response;
  constructor(res: Response) {
    this.res = res;
  }
  getData() {
    return this.res.json() as Promise<T>;
  }
  isError() {
    return this.res.status !== 200 && this.res.status !== 201;
  }
  checkAuth() {
    if (this.res.status === 401) redirect("/login");
    else return this;
  }
  checkNotFound() {
    if (this.res.status === 404) notFound();
    else return this;
  }
  checkInternal() {
    if (this.res.status === 500) throw new Error("API failed");
    else return this;
  }
}

// import { METHODS, SORTFIELD, SORTORDER } from "./consts";

// export const APIS = {
// REGISTER: () => getCallObject("register", METHODS.post),
// LOGIN: () => getCallObject("signin", METHODS.post),
// GETPOSTS: (
//   pageNumber: number,
//   sortWith: SORTFIELD,
//   order: SORTORDER,
//   query: string
// ) =>
//   getCallObject(
//     query
//       ? `posts?_q=${query}&_limit=${PAGE_SIZE}&_expand=user`
//       : `posts?_limit=${PAGE_SIZE}&_page=${pageNumber}&_sort=${sortWith}&_order=${order}&_expand=user`,
//     METHODS.get
//   ),
// GETUSERS: (query: string) => getCallObject(`/users?_q=${query}`, METHODS.get),
// GETUSER: (userId: string) => getCallObject(`user/${userId}`, METHODS.get),
// REACTONCOMMENT: (commentId: string) =>
//   getCallObject(`comments/${commentId}`, METHODS.put),
// CREATEPOST: () => getCallObject("posts", METHODS.post),
// GETPOST: (postId: string) => getCallObject(`posts/${postId}`, METHODS.get),
// GETLIKESONPOST: (postId: string) =>
//   getCallObject(`posts/${postId}/likes`, METHODS.get),
// REACTONPOST: (postId: string) =>
//   getCallObject(`posts/${postId}/react`, METHODS.put),
// COMMENTONPOST: (postId: string) =>
//   getCallObject(`posts/${postId}/comment() => `, METHODS.post),
// };
