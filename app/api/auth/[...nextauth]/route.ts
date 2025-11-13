import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { User } from "next-auth";

export const authOptions = {
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
    // ホワイトリストチェック
    async signIn({ user }: { user: User }) {
      const allowedEmails = process.env.ALLOWED_EMAILS?.split(",").map((e) => e.trim()) || [];
      return allowedEmails.includes(user.email ?? "");
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };