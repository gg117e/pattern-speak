# Pattern Speak

英語スピーキング初心者向けの定型表現練習アプリです。AI APIや自動採点は使わず、Web Speech API と自己評価だけで学習履歴を管理します。

## 目的

単文暗記ではなく、英語の定型表現を使って、日本語を見た瞬間に英語で言えるようにするための練習アプリです。

- Core Speaking: 10 Unit / 50 cards
- Daily Conversation: 5 Unit / 25 cards
- Business Discussion: 30 Unit / 150 cards
- Total: 45 Unit / 225 cards

## 起動方法

Windowsでは PowerShell の設定により `npm` が止まることがあります。その場合は `npm.cmd` を使います。

```powershell
npm.cmd install
npm.cmd run dev:local
```

または、このフォルダの `start-dev.cmd` をダブルクリックしてください。

起動後、ブラウザで以下を開きます。

```text
http://127.0.0.1:3000
```

## 主な構成

- `src/data/units.ts`: Unit定義
- `src/data/cards.ts`: 225枚のカードデータ
- `src/lib/review.ts`: 復習間隔ロジック
- `src/lib/storage.ts`: localStorageの保存処理
- `src/hooks/useSpeech.ts`: Web Speech APIの読み上げ処理
- `src/components/StudySession.tsx`: 学習画面の中心コンポーネント

## 確認コマンド

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
```

## 学習フロー

日本語を見る、表現パターンを確認する、口で英語を言う、答えを見る、音声を聞く、自己評価する、という順番で進めます。
