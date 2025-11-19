"use client";

import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useFoodsData } from "../components/loadFoodsData";

export default function FormLayout({ children }: { children: React.ReactNode }) {

  const methods = useForm({ 
    mode: "onChange",
  });
  const router = useRouter();

  const onSubmit = async (data: any) => {
    console.log("✅ フォーム送信データ:", data);

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (result.success) {
        // 結果ページにはIDだけ渡す
        router.push(`/survey/result?id=${result.id}`);
      } else {
        alert("送信に失敗しました");
      }
    } catch (err) {
      console.error("送信エラー:", err);
      alert("サーバーとの通信に失敗しました");
    }
  };

  return (
    <div style={{ backgroundImage: "url('/img/bg.jpg')", filter: "brightness(1.2)" }}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
          {children}
        </form>
      </FormProvider>
    </div>
  );
}
