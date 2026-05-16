# 政治正確影響測驗

Next.js + TypeScript + Tailwind CSS 互動式作品製作測驗。

主題是「政治正確對影視與遊戲產業評價的影響」。使用者先選擇製作影視或遊戲作品，再回答一系列製作決策問題。系統會把每個選項轉換成 userProfile tags，最後與 `data/works.ts` 的本地 mock data 比對，推薦最相似的真實作品。

## 功能

- 影視 / 遊戲作品分流
- 約 20 題製作決策題庫
- 本地 mock data，不串接 API
- `userProfile` tag 加權與相似度比對
- 結果頁顯示真實作品、年份、背景圖與相似度
- 政治正確影響指標
- 影視與遊戲評分卡片
- 右往左移動的彈幕評論區
- 重新測驗

## 檔案結構

```text
app/
  page.tsx
  quiz/page.tsx
  result/page.tsx
components/
  Danmaku.tsx
  PoliticalIndexPanel.tsx
  RatingCard.tsx
data/
  questions.ts
  works.ts
lib/
  matchWork.ts
```

## 本機執行

在 CMD：

```cmd
cd "C:\Users\dusti\OneDrive\Documents\New project"
npm install
npm run dev
```

在 PowerShell：

```powershell
cd "C:\Users\dusti\OneDrive\Documents\New project"
npm.cmd install
npm.cmd run dev
```

打開瀏覽器：

```text
http://localhost:3000
```

## 驗證

```cmd
npm run build
npm run lint
```
