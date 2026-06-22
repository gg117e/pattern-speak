# Pattern Speak

英語スピーキング初心者向けの定型表現練習アプリです。AI APIや自動採点は使わず、Web Speech API と自己評価だけで学習履歴を管理します。

**公開URL: https://gg117e.github.io/pattern-speak/** （GitHub Pages で公開。`main` ブランチへの push で自動デプロイされます）

## 目的

単文暗記ではなく、英語の定型表現を使って、日本語を見た瞬間に英語で言えるようにするための練習アプリです。

- Core Speaking: 10 Unit / 50 cards
- Daily Conversation: 10 Unit / 50 cards
- Business Discussion: 30 Unit / 150 cards
- 合計: 50 Unit / 250 cards
- 単語学習: 51 語（日常頻出語）
- ミニ対話: 6 本

## 主な機能

- **学習画面**: 日本語を見て英語で言い、ヒント・答え・音声・自己評価で確認します（キーボードショートカット対応）。
- **ランダム練習** (`/practice`): 章（Core / Daily / Business / 全部）と問題数を選んでランダム出題します。
- **ミニ対話** (`/dialogue`): 学んだ型をつなげ、相手とのやり取りを短い会話として口に出します。
- **単語学習** (`/vocab`): 日常頻出語を「意味 → 英単語・例文」で覚え、音声と自己評価で定着させます。
- **復習** (`/review`): 復習期限が来たカードを全セクションからまとめて練習します。
- **1日の目標・ストリーク**: 毎日の学習回数を記録し、目標達成度と連続学習日数（🔥）を表示します。
- **学習状況** (`/stats`): カード・単語の進捗や自己評価の回数を確認できます。

学習履歴・目標・ストリークはすべてブラウザの localStorage に保存され、サーバーには送信されません。

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

- `src/data/units.ts`: Unit定義（50 Unit）
- `src/data/cards.ts`: 250枚のカードデータ
- `src/data/vocab.ts`: 単語学習用の語彙データ
- `src/data/dialogues.ts`: ミニ対話のデータ
- `src/lib/review.ts`: 復習間隔ロジック
- `src/lib/streak.ts`: 連続学習日数・当日の学習数の集計
- `src/lib/storage.ts`: localStorageの保存処理（学習履歴・活動ログ・目標）
- `src/hooks/useSpeech.ts`: Web Speech APIの読み上げ処理
- `src/components/StudySession.tsx`: 学習画面の中心コンポーネント
- `src/components/PracticeDeck.tsx` / `VocabDeck.tsx` / `DialogueDeck.tsx`: 各練習モードの入口
- `src/components/DailyGoalCard.tsx`: 1日の目標・ストリーク表示

## 確認コマンド

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
```

## 学習フロー

1. 日本語の問題を見る
2. 自分で英語を口に出して言ってみる
3. 必要なら「ヒントを見る」で表現パターンとヒント語を確認する
4. 「答えを見る」で模範解答を表示し、🔊 で音声を聞く
5. 手応えを4段階（もう一度 / あいまい / 言えた / スラスラ）で自己評価する

自己評価に応じて次回の復習タイミングが決まります。デスクトップではキーボードショートカット（Space・H・A・P・1〜4）で素早く進められます。

## GitHub Pages での公開

このアプリはサーバー機能を使わない静的サイトとして書き出せるため、GitHub Pages で公開できます。

設定の概要:

- `next.config.ts`: `output: "export"` で静的書き出し。本番ビルド時のみ `basePath: "/pattern-speak"` を付与
- 各動的ルートに `generateStaticParams` を定義し、全ページを事前生成
- `public/.nojekyll`: GitHub Pages が `_next` フォルダを無視しないようにする
- `.github/workflows/deploy.yml`: `main` への push で自動ビルド & デプロイ

### 公開手順

1. GitHub リポジトリの Settings → Pages を開く
2. **Source** を **GitHub Actions** に設定する
3. `main` ブランチに push すると、ワークフローが自動でビルドしてデプロイする

公開URL:

```text
https://gg117e.github.io/pattern-speak/
```

ローカルで本番ビルドを確認する場合:

```powershell
npm.cmd run build
```

書き出し結果は `out/` フォルダに生成されます。
