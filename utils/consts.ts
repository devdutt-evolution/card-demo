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

export enum SORTORDER {
  asc = "asc",
  desc = "desc",
}

export enum SORTFIELD {
  title = "title",
  time = "createAt",
  likes = "numberOfLikes",
}
