import axios from "axios";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: ({ session, token, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          token: token.token,
          id: token.id,
        },
      };
    },
    jwt: ({ token, user }: { token: any; user: any }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
          token: user.token,
        };
      }
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Sign In",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_URL_BACKEND}/signin`,
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );

          const user = res.data;
          return user;
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};
