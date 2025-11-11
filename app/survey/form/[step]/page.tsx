"use client";

import { useFormContext } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { useFoodsData } from "../../components/loadFoodsData";
import FoodQuestion from "../../components/FoodQuestion";
import FormNavigation from "../../components/FormNavigation";

export default function StepForm() {
  const { step } = useParams();
  const { foodsData, loading } = useFoodsData();
  const { control } = useFormContext();  // ← これでOK
  const router = useRouter();

  if (loading || !foodsData) return <p>Loading...</p>;

  const currentFoods =
    step === "1" ? foodsData.foodsOne :
    step === "2" ? foodsData.foodsTwo :
    step === "3" ? foodsData.foodsThree :
    step === "4" ? foodsData.foodsFour : foodsData.foodsFive;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">ページ {step}</h2>
      {currentFoods.map((food: any, index: number) => (
        <FoodQuestion key={index} food={food} index={index} />
      ))}
      <FormNavigation step={Number(step)} />
    </div>
  );
}

