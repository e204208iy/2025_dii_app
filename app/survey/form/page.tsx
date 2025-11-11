"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FormEntryPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/survey/form/1");
  }, [router]);

  return <p>ページを読み込んでいます...</p>;
}