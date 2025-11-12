import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const isAuthEnabled = process.env.NEXT_PUBLIC_ENABLE_AUTH === "true";

const handler = NextAuth({
  providers: isAuthEnabled
    ? [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
      ]
    : [],
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      // セッション情報をカスタマイズしたい場合はここに
      return session;
    },
    async signIn({ user, account, profile }) {
      // 認証OFF時は常に通す
      if (!isAuthEnabled) return true;
      return !!user && !!account;
    },
  },
});

export { handler as GET, handler as POST };


