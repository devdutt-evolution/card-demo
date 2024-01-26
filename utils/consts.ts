const BASE = process.env.NEXT_PUBLIC_URL_BACKEND;
const PAGE_SIZE = 10;

export enum METHODS {
  get = "GET",
  post = "POST",
  put = "PUT",
  delete = "DELETE",
}

export enum REACTIONS {
  LIKE = "like",
  HEART = "heart",
  SAD = "sad",
  HAPPY = "happy",
  VERIFIED = "verified",
  ANGRY = "angry",
}

export enum SORTORDER {
  asc = "asc",
  desc = "desc",
}

export enum SORTFIELD {
  title = "username",
  time = "createAt",
  likes = "numberOfLikes",
}

const getCallObject = (path: string, method: METHODS) => ({
  url: `${BASE}/${path}`,
  method,
});

export const APIS = {
  REGISTER: () => getCallObject("register", METHODS.post),
  LOGIN: () => getCallObject("signin", METHODS.post),
  GETPOSTS: (
    pageNumber: number,
    sortWith: SORTFIELD,
    order: SORTORDER,
    query: string
  ) =>
    getCallObject(
      query
        ? `posts?_q=${query}&_limit=${PAGE_SIZE}&_expand=user`
        : `posts?_limit=${PAGE_SIZE}&_page=${pageNumber}&_sort=${sortWith}&_order=${order}&_expand=user`,
      METHODS.get
    ),
  GETUSERS: (query: string) => getCallObject(`/users?_q=${query}`, METHODS.get),
  GETUSER: (userId: string) => getCallObject(`user/${userId}`, METHODS.get),
  REACTONCOMMENT: (commentId: string) =>
    getCallObject(`comments/${commentId}`, METHODS.put),
  CREATEPOST: () => getCallObject("posts", METHODS.post),
  GETPOST: (postId: string) => getCallObject(`posts/${postId}`, METHODS.get),
  GETLIKESONPOST: (postId: string) =>
    getCallObject(`posts/${postId}/likes`, METHODS.get),
  REACTONPOST: (postId: string) =>
    getCallObject(`posts/${postId}/react`, METHODS.put),
  COMMENTONPOST: (postId: string) =>
    getCallObject(`posts/${postId}/comment() => `, METHODS.post),
};
