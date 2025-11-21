import fs from "fs";
import path from "path";

// ---- ① extractUnit（あなたの関数） ----
function extractUnit(foodName) {
  const mainUnitMatch = foodName.match(/(杯|個|皿|本|枚|人前)/g);
  if (mainUnitMatch) return mainUnitMatch.join("/");

  const multiMatch = foodName.match(/(\d+)?(本|枚|個)\/(\d+)?(本|枚|個)/);
  if (multiMatch) return multiMatch[2] + "/" + multiMatch[4];

  const parenMatch = foodName.match(/\((\d*\.?\d*)([a-zA-Z]+)\)/);
  if (parenMatch) return parenMatch[2];

  const weightMatch = foodName.match(/(\d*\.?\d*)(g|ml)/i);
  if (weightMatch) return weightMatch[2];

  return "";
}

// ---- ② public/data フォルダのJSONをすべて処理 ----

const dataDir = path.join(process.cwd(), "public", "data");

const files = fs.readdirSync(dataDir).filter((f) => f.endsWith(".json"));

files.forEach((file) => {
  const filePath = path.join(dataDir, file);
  console.log(`変換中: ${file}`);

  // JSON 読み込み
  const raw = fs.readFileSync(filePath, "utf8");
  const json = JSON.parse(raw);

  // ③ 各データに "単位" を付与
  const transformed = json.map((item) => ({
    ...item,
    単位: extractUnit(item.食品),
  }));

  // ④ 上書き保存
  fs.writeFileSync(filePath, JSON.stringify(transformed, null, 2), "utf8");
});

console.log("🎉 すべての JSON に '単位' を追加しました！");
