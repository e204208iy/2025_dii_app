import { withAuth } from "next-auth/middleware";

const isAuthEnabled = process.env.NEXT_PUBLIC_ENABLE_AUTH === "true";

export default isAuthEnabled
  ? withAuth({
      callbacks: {
        authorized: ({ token }) => {
          // 認証ON時：ログイン必須
          return !!token;
        },
      },
      pages: {
        signIn: "/login",
      },
    })
  : function middleware() {
      // 認証OFFモード（すべて通す）
    };

export const config = {
  matcher: ["/survey/:path*"],
};
