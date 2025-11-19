"use client";

import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { useFoodsData } from "../../components/loadFoodsData";
import FoodQuestion from "../../components/FoodQuestion";
import FormNavigation from "../../components/FormNavigation";

export default function StepForm() {
  const { step } = useParams();
  const { foodsData, loading } = useFoodsData();
  const { control } = useFormContext();  // ← これでOK
  const { reset } = useFormContext();
  const router = useRouter();

  // ⭐ 初期値をセット（frequency = "none", intake = ""）
  useEffect(() => {
    if (!loading && foodsData) {
      const defaults: any = { foods: {} };

      const allFoods = [
        ...foodsData.foodsOne,
        ...foodsData.foodsTwo,
        ...foodsData.foodsThree,
        ...foodsData.foodsFour,
        ...foodsData.foodsFive,
      ];

      allFoods.forEach((food: any) => {
        defaults.foods[food.食品] = {
          frequency: "none",
          intake: "",
        };
      });

      reset(defaults); // ← ここで初期化完了！
    }
  }, [foodsData, loading, reset]);

  //プログレスバー
  const currentStep = Number(step);
  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  if (loading || !foodsData) return <p>Loading...</p>;

  const currentFoods =
    step === "1" ? foodsData.foodsOne :
    step === "2" ? foodsData.foodsTwo :
    step === "3" ? foodsData.foodsThree :
    step === "4" ? foodsData.foodsFour : foodsData.foodsFive;

  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <h2 className="text-sm font-semibold mb-2">ページ {step} / 5</h2>
      {/* 🚀 プログレスバー */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
        <div
          className="bg-blue-500 h-3 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      {currentFoods.map((food: any, index: number) => (
        <FoodQuestion key={index} food={food} index={index} />
      ))}
      <FormNavigation step={Number(step)} />
    </div>
  );
}

