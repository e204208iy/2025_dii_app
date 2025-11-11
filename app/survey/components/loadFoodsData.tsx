"use client";

import { useState, useEffect } from "react";

// JSON読み込み用の共通関数
async function loadJsonData(path: string) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json();
}

// あなたが提示してくれたloadAllFoods()をそのまま利用
export async function loadAllFoods() {
  const [foodsOne, foodsTwo, foodsThree, foodsFour, foodsFive, rice] =
    await Promise.all([
      loadJsonData("/data/foods_data1.json"),
      loadJsonData("/data/foods_data2.json"),
      loadJsonData("/data/foods_data3.json"),
      loadJsonData("/data/foods_data4.json"),
      loadJsonData("/data/foods_data5.json"),
      loadJsonData("/data/fortifiedRice.json"),
    ]);
  return { foodsOne, foodsTwo, foodsThree, foodsFour, foodsFive, rice };
}

/**
 * useFoodsData:
 *  - JSONをロードしてReact stateで保持する
 *  - 他ページから同じデータを再利用可能
 */
export function useFoodsData() {
  const [foodsData, setFoodsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await loadAllFoods();
        setFoodsData(data);
      } catch (err: any) {
        setError(err.message || "データ読み込みに失敗しました");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { foodsData, loading, error };
}
