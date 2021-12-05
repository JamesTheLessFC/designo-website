import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../db";
import bcrypt from "bcrypt";

let userAccount = null;

export default async function authHandler(req, res) {
  await NextAuth(req, res, {
    session: {
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60,
    },
    secret: process.env.SECRET,
    providers: [
      CredentialsProvider({
        id: "credentials",
        credentials: {
          username: { label: "Username", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          const user = await prisma.user.findFirst({
            where: {
              username: credentials.username,
            },
          });

          if (user) {
            const isValidPassword = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isValidPassword) {
              // Any object returned will be saved in `user` property of the JWT
              userAccount = {
                id: user.id,
                isActive: user.isActive,
              };
              return userAccount;
            } else {
              return null;
            }
          } else {
            // If you return null or false then the credentials will be rejected
            return null;
          }
        },
      }),
    ],
    callbacks: {
      async signIn({ user, account, profile }) {
        if (typeof user.id !== typeof undefined) {
          if (user.isActive) {
            return user;
          } else {
            return false;
          }
        }
      },
      async jwt(token, user, account, profile, isNewUser) {
        if (typeof user !== typeof undefined) {
          token.user = user;
        }
        return token;
      },
      async session({ session, token, user }) {
        if (userAccount) {
          session.user = userAccount;
        } else if (
          typeof token.user !== typeof undefined &&
          (typeof session.user === typeof undefined ||
            (typeof session.user !== typeof undefined &&
              typeof session.user.id === typeof undefined))
        ) {
          session.user = token.user;
        } else if (typeof token !== typeof undefined) {
          session.token = token;
        }
        return session;
      },
    },
  });
}
