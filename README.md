## DIIアプリ

## 使用技術表
| 層           | 使用技術                                               |
| ----------- | -------------------------------------------------- |
| **フロントエンド** | Next.js 16 |
| **フォーム** | react hook form                                         |
| **DB**      | MongoDB Atlas（無料枠あり）                               |
| **ORM/ODM** | Mongoose                   |
| **デプロイ**    | Vercel（環境変数にMongoDB URIを登録）                        |

## プロジェクトのディレクトリ構成
```
project-root/
├── app/
│   ├── api/
│   │   ├── submit/
│   │   │   └── route.ts                # ← MongoDBとの通信API（POST/GET）
│   │   └── auth/ [...nextauth]/
│   │                   └── route.ts
│   │
│   ├── survey/
│   │   ├── page.tsx                    # ← アンケートの最初のページ（開始画面）
│   │   ├── components/
│   │   │   ├── FoodQuestion.tsx                # ← 各食品の質問（ラジオ＋数値入力）
│   │   │   ├── FormNavigation.tsx              # ← 戻る・次へ・送信ボタン
│   │   │   ├── RiceOptions.tsx                 # ← 「ワイン・カクテル」時に表示される米選択
│   │   │   ├── useFoodsData.ts                 # ← JSONを読み込むカスタムフック
│   │   ├── form/
│   │   │   ├── layout.tsx              # ← FormProvider + <form> 全ページを包む
│   │   │   ├── page.tsx                # ← /survey/form にアクセス時 → /survey/form/1 に自動遷移
│   │   │   └── [step]/page.tsx         # ← 各ページのフォーム内容（foods1〜5）
│   │   │
│   │   └── result/
│   │       └── page.tsx                # ← 結果ページ（MongoDBからデータ取得）
│   │
│   └── layout.tsx                      # ← App全体の共通レイアウト（自動生成でもOK）
│
├── db/
│   └── mongodb.ts                      # ← Mongoose接続設定
│
├── public/
│   └── data/
│       ├── foods_data1.json
│       ├── foods_data2.json
│       ├── foods_data3.json
│       ├── foods_data4.json
│       ├── foods_data5.json
│       └── fortifiedRice.json
│
├── docker-compose.yml                  # ← MongoDBコンテナ設定
├── .env.local                          # ← MONGODB_URI=mongodb://root:example@localhost:27017/
├── package.json
├── tsconfig.json
└── next.config.mjs                     # ← （Next.js設定ファイル）

```

## MongoDB Atlsの無料枠に関する考察

### mongoDBへの接続設定

- maxPoolSize: 5,
- serverSelectionTimeoutMS: 5000,
- socketTimeoutMS: 45000,

### jsonデータを２件入れた段階でのデータ(show dbs)
- admin 100.00 KiB
- config 108.00 KiB
- dii_app 72.00 KiB
- local 72.00 KiB
### 今の実測からの単純推定
- 72 KiB / 2 = 36 KiB
- 512 MB = 512 × 1024 KiB = 524,288 KiB
- 524,288 KiB ÷ 36 KiB ≒ 14,563 件
- オーバヘッドを考慮
  - 524,288 KiB ÷ 43.2 KiB ≒ 12,133 件