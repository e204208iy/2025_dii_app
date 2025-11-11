"use client";

import { Controller, useFormContext } from "react-hook-form";
import { useFoodsData } from "./loadFoodsData";

export default function RiceOptions({ name }: { name: string }) {
  const { control } = useFormContext();
  const { foodsData } = useFoodsData();

  if (!foodsData) return null;

  const riceList = foodsData.rice || [];

  // 固定項目（白米）
  const defaultRice = [
    { 食品: "白米（胚芽米、強化米を含む）" },
  ];

  // riceList の中に含まれる食品（麦ご飯・玄米など）を追加
  const allOptions = [...defaultRice, ...riceList];

  return (
    <div className="mt-3 border p-3 rounded-lg bg-gray-50">
      <p className="font-medium mb-2 text-sm">よく食べる米の種類を教えてください：</p>
      <div className="flex flex-col gap-1">
        <Controller
          name={name}
          control={control}
          defaultValue={[]}
          render={({ field }) => {
            const { value, onChange } = field;

            const toggleValue = (riceName: string) => {
              if (value.includes(riceName)) {
                onChange(value.filter((v: string) => v !== riceName));
              } else {
                onChange([...value, riceName]);
              }
            };

            return (
              <>
                {allOptions.map((r, idx) => (
                  <label key={idx} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={value.includes(r.食品)}
                      onChange={() => toggleValue(r.食品)}
                    />
                    <span>{r.食品}</span>
                  </label>
                ))}
              </>
            );
          }}
        />
      </div>
    </div>
  );
}