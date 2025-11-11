"use client";

import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { useState } from "react";

export default function FormNavigation({ step }: { step: number }) {
  const router = useRouter();
  const { trigger, formState: { errors } } = useFormContext();
  const [pageErrors, setPageErrors] = useState<string[]>([]);

  const handleNext = async () => {
    // ✅ 現在ページのバリデーションを実行
    const isValid = await trigger(undefined, { shouldFocus: true });

    if (!isValid) {
      // エラーメッセージを抽出
      const errorMessages = Object.values(errors).map(
        (err: any) => err?.message || "未回答の項目があります。"
      );
      setPageErrors(errorMessages);
      return;
    }

    // エラーがなければ次ページへ
    setPageErrors([]);
    router.push(`/survey/form/${step + 1}`);
  };

  return (
    <div className="mt-8">
      {/* ボタン群 */}
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
            onClick={handleNext}
          >
            次へ
          </button>
        ) : (
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            送信
          </button>
        )}
      </div>

      {/* ページ下のエラーリスト表示 */}
      {pageErrors.length > 0 && (
        <div className="mt-6 bg-red-50 border border-red-300 rounded-lg p-4">
          <p className="text-red-700 font-semibold mb-2">
            未回答の項目があります：
          </p>
          <ul className="list-disc list-inside text-red-600 text-sm">
            {pageErrors.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
