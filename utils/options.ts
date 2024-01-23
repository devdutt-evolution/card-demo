import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type UserResponse = {
  id: string;
  name: string;
  email: string;
  token: string;
};

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: ({ token: decodedToken, user }) => {
      // if first login
      if (user) {
        return {
          ...decodedToken,
          id: user.id,
          email: user.email,
          name: user.name,
          token: user.token,
        };
      }
      // else
      return decodedToken;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          token: token.token,
          id: token.id,
          name: token.name,
          email: token.email,
        },
      };
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credential",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
        fcmToken: { label: "fcmToken", type: "text", placeholder: "fcmToken" },
      },
      async authorize(credentials): Promise<UserResponse> {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL_BACKEND}/signin`,
          {
            method: "post",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
              fcmToken: credentials?.fcmToken,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        if (res.status == 200) {
          let data = await res.json();
          return data;
        } else {
          let error = await res.json();
          throw new Error(error?.message || "Failed authentication");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};
