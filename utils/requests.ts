import axios from "axios";

const BASE = process.env.NEXT_PUBLIC_URL_BACKEND;
export const SIGNIN = BASE + "/signin";
export const REGISTER = BASE + "/register";
export const CREATE_COMMENT = (postId: string) =>
  BASE + "/posts/" + postId + "/comment";
export const CREATE_POSTS = (postId: string) => BASE + "/posts/" + postId;

export const getWrapper = async (url: string, token: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => resolve(data.data))
      .catch((err) => {
        if (err.name === "AxiosError") reject(err.response.data?.message);
        else reject(err.toString());
      });
  });
};

export const postWrapper = async (
  url: string,
  token: string,
  payload: Object
) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => resolve(data.data))
      .catch((err) => {
        if (err.name === "AxiosError") reject(err.response.data?.message);
        else reject(err.toString());
      });
  });
};
