import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { UserRole } from "@prisma/client";

export const options: NextAuthOptions = {
  pages: {
    signIn: "/login",

    error: "/login",
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
        const { email, password, role } = credentials as {
          email: string;
          password: string;
          role: UserRole;
        };

        const matchingUser = await db.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });

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
          role: matchingUser.role,
          randomKey: "Hey cool",
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role
      return token;
    },
    // if you want to use the role in client components
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    }
  },
};
