"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function SurveyPage() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex flex-col items-center">
        <p>ログインしてください</p>
        <button
          onClick={() => signIn("google", { callbackUrl: "/survey" })}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Googleでログイン
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <p>こんにちは、{session.user?.name} さん！</p>
      <button
        onClick={() => signOut()}
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        ログアウト
      </button>
    </div>
  );
}

