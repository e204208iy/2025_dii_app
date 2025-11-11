"use client";

import { useRouter } from "next/navigation";

export default function FormNavigation({ step }: { step: number }) {
  const router = useRouter();
  return (
    <div className="flex justify-between mt-6">
      {step > 1 && (
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => router.push(`/survey/form/${step - 1}`)}
        >
          戻る
        </button>
      )}
      {step < 5 ? (
        <button
          type="button"
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => router.push(`/survey/form/${step + 1}`)}
        >
          次へ
        </button>
      ) : (
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
          送信
        </button>
      )}
    </div>
  );
}