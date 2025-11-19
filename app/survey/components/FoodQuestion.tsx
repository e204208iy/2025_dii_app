"use client";

import { Controller, useFormContext } from "react-hook-form";
import RiceOptions from "./RiceOptions";
// import '../styles/survey.css'

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
    <div className="border-b pb-4 mb-1 border-stone-300 w-6/7 backdrop-blur-xl bg-white/40 p-4 shadow-xl rounded-lg">
      <h2 className="text-black font-bold text-sm">
        {index + 1}. {food.食品}
      </h2>
      <div className="flex justify-between flex-wrap mt-2 gap-1 text-lg">
        {frequencies.map((freq) => (
          <label key={freq.value} className="mr-3">
            <Controller
              name={frequencyName}
              control={control}
              rules={{ required: `${food.食品} を選択してください` }} // ✅ 必須指定！
              render={({ field }) => (
                <label className="flex items-center cursor-pointer">
                  <input
                    {...field}
                    type="radio"
                    value={freq.value}
                    checked={field.value === freq.value}
                    className="hidden peer"
                  />
                  <div className="w-5 h-5 border-2 border-gray-400 rounded-sm peer-checked:bg-blue-500"></div>
                  <span className="ml-1">{freq.label}</span>
                </label>
              )}
            />
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
          <label className="mr-2">一日当たりの摂取量</label>
        <Controller
          name={intakeName}
          control={control}
          render={({ field }) => {
            const value = Number(field.value) || 0;

            return (
              <div className="flex items-center gap-2">

                {/* マイナスボタン */}
                <button
                  type="button"
                  onClick={() => {
                    const newValue = Math.max(0.5, value - 0.5);
                    field.onChange(newValue);
                  }}
                  className="px-3 py-1 bg-gray-200 rounded font-bold border border-solid"
                >
                  −
                </button>

                {/* 数値入力 */}
                <input
                  {...field}
                  value={field.value ?? 50}
                  type="number"
                  step="1"
                  min="0"
                  max="100"
                  className="border px-2 py-1 w-20 text-center"
                />

                {/* プラスボタン */}
                <button
                  type="button"
                  onClick={() => {
                    const newValue = Math.min(10, value + 0.5);
                    field.onChange(newValue);
                  }}
                  className="px-3 py-1 bg-gray-200 rounded font-bold border border-solid"
                >
                  ＋
                </button>

              </div>
            );
          }}
        />
        </div>
      )}

      {food.食品.includes("ワイン") && food.食品.includes("カクテル") && (
        <RiceOptions name={`foods.${food.食品}.rice`} />
      )}
    </div>
  );
}