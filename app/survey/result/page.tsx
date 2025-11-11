"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SurveyResultPage() {
  const searchParams = useSearchParams();
  const [survey, setSurvey] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) return;
    fetch(`/api/submit?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSurvey(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ データ取得エラー:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>読み込み中...</p>;
  if (!survey) return <p>データが見つかりません。</p>;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">アンケート送信完了</h1>
      <p className="text-green-700 mb-4 font-semibold">
        ✅ MongoDBに保存されました（ID: {survey._id}）
      </p>

      <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
        <pre className="text-sm overflow-x-auto">
          {JSON.stringify(survey, null, 2)}
        </pre>
      </div>
    </div>
  );
}

