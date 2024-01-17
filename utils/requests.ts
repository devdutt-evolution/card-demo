const BASE = process.env.NEXT_PUBLIC_URL_BACKEND;
export const SIGNIN = BASE + "/signin";
export const REGISTER = BASE + "/register";
export const CREATE_COMMENT = (postId: string) =>
  BASE + "/posts/" + postId + "/comment";
export const CREATE_POSTS = (postId: string) => BASE + "/posts/" + postId;

export const getWrapper = async (url: string, token: string) => {
  return new Promise(async (resolve, reject) => {
    const result = await fetch(url, {
      headers: { authorization: `Bearer ${token}` },
    });

    let data = await result.json();
    if (result.status == 200) {
      resolve(data);
    } else {
      reject(data);
    }
  });
};

export const postWrapper = async (
  url: string,
  token: string,
  payload: Object
) => {
  return new Promise(async (resolve, reject) => {
    const result = await fetch(url, {
      method: "post",
      body: JSON.stringify(payload),
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (result.status == 200 || result.status == 201) {
      return resolve(await result.json());
    } else {
      return reject(await result.json());
    }
  });
};
