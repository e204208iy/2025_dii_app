"use client";

import { Controller, useFormContext } from "react-hook-form";
import RiceOptions from "./RiceOptions";
import '../styles/survey.css'

const frequencies = [
  { value: "daily", label: "毎日" },
  { value: "week5-6", label: "週5-6" },
  { value: "week2-4", label: "週2-4" },
  { value: "week1", label: "週1" },
  { value: "month1-3", label: "月1-3" },
  { value: "none", label: "無" },
];

export default function FoodQuestion({ food, index }: any) {
  const { control, watch, formState: { errors } } = useFormContext();
  const frequencyName = `foods.${food.食品}.frequency`;
  const intakeName = `foods.${food.食品}.intake`;
  const selected = watch(frequencyName);

  return (
    <div className="border-b pb-4 mb-4 border-stone-300">
      <h2 className="form-title">{food.食品}</h2>
      <div className="flex flex-wrap gap-5 mt-2 text-lg">
        {frequencies.map((freq) => (
          <label key={freq.value} className="mr-3">
            <Controller
              name={frequencyName}
              control={control}
              rules={{ required: `${food.食品} を選択してください` }} // ✅ 必須指定！
              render={({ field }) => (
                <input
                  {...field}
                  type="radio"
                  value={freq.value}
                  checked={field.value === freq.value}
                />
              )}
            />
            <span className="ml-1">{freq.label}</span>
          </label>
        ))}
      </div>
            {/* 各質問の下にも個別エラー */}
      {errors[food.食品] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[food.食品]?.message as string}
        </p>
      )}

      {selected !== "none" && selected && (
        <div className="mt-3">
          <label className="mr-2">一日当たりの摂取量：</label>
          <Controller
            name={intakeName}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                step="0.5"
                min="0.5"
                max="10"
                className="border px-2 py-1 w-20"
              />
            )}
          />
        </div>
      )}

      {food.食品.includes("ワイン") && food.食品.includes("カクテル") && (
        <RiceOptions name={`foods.${food.食品}.rice`} />
      )}
    </div>
  );
}