"use server";

import { RedirectType, redirect } from "next/navigation";
import { METHODS } from "./consts";

export const GET = async (url: string, token?: string) => {
  const headers = {};

  if (token)
    Object.assign(headers, {
      headers: { authorization: `Bearer ${token}` },
    });

  const res = await fetch(url);

  if (res.status == 200) {
    const data = await res.json();
    return { data, error: null };
  } else if (res.status == 401) {
    redirect("/login");
  } else {
    const error = await res.json();
    return { data: null, error: error?.message || "Request Failed" };
  }
};

export const METHOD = async (
  method: METHODS,
  url: string,
  token: string,
  payload?: Object,
  ...other: Object[]
) => {
  const options = {
    method,
  };

  if (payload)
    Object.assign(options, {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

  if (token) {
    Object.assign(options, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }
  if (other) {
    Object.assign(options, {
      ...other,
    });
  }
  const res = await fetch(url, options);

  if (res.status == 200 || res.status == 201) {
    const data = await res.json();
    return { data, error: null };
  } else if (res.status == 401) {
    redirect("/login", RedirectType.replace);
  } else {
    const error = await res.json();
    return { data: null, error: error?.message || "Request Failed" };
  }
};
