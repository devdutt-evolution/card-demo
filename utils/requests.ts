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
