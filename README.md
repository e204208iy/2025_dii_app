## 12月13日 DIIアプリ
| 層           | 使用技術                                               |
| ----------- | -------------------------------------------------- |
| **フロントエンド** | Next.js 15 (App Router, React Server Components対応) |
| **フォーム** | react hook form                                         |
| **DB**      | MongoDB Atlas（無料枠あり）                               |
| **ORM/ODM** | Mongoose または Prisma（MongoDB対応モード）                  |
| **デプロイ**    | Vercel（環境変数にMongoDB URIを登録）                        |

app/
├─ survey/
│  ├─ page.tsx                 ← foods_data1.json
│  ├─ page2/page.tsx           ← foods_data2.json
│  ├─ page3/page.tsx
│  ├─ page4/page.tsx
│  ├─ page5/page.tsx
│  ├─ rice/page.tsx            ← 最後に送信
│  ├─ components/
│  │   ├─ GenerateForm.tsx     ← 回答フォーム
│  │   └─ loadData.ts
│  └─ SurveyContext.tsx        ← 回答保持コンテキスト
└─ api/
   └─ survey/route.ts
