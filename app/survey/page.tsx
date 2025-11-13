"use client";

import { useRouter } from "next/navigation";
import './styles/survey.css'

export default function SurveyStartPage() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/survey/form/1");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">DIIに関するアンケート</h1>
        <p className="text-gray-600 mb-6">
          このアンケートは、日常の食事内容をもとにDII（食事性炎症指数）を推定します。<br />
          全70項目を5ページに分けてご回答ください。
        </p>
        <button
          onClick={handleStart}
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          アンケートを開始する
        </button>
      </div>
    </div>
  );
}
