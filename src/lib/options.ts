import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export const options: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      name: "Login in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        console.log("email: ", email, "password: ", password)

        const matchingUser = await db.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });

        console.log("matchingUser: ", matchingUser)

        if (!matchingUser) {
          return null; // User not found
        }

        if (credentials?.password === undefined) {
          return null; // Password not provided, authentication failure
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = bcrypt.compare(
          credentials?.password,
          matchingUser?.password as string
        );

        if (!passwordMatch) {
          return null; // Passwords do not match
        }

        return {
          id: matchingUser.id,
          name: matchingUser.name,
          email: matchingUser.email,
          randomKey: "Hey cool",
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        }
      }
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  }
};
