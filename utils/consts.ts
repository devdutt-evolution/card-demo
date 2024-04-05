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
  UNLIKE = "unlike",
}

export enum SORT_ORDER {
  asc = "asc",
  desc = "desc",
}

export enum SORT_FIELD {
  title = "title",
  time = "createdAt",
  likes = "numberOfLikes",
}
