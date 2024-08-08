# Schedule Management App

## Features
- Add, view, update, and delete tasks.
- Tasks are stored in a SQLite database.
- Frontend built with Svelte and Tailwind CSS.
- Backend powered by Express.js.

## Setup

### Prerequisites
- Node.js
- npm
- SQLite

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/C4N4242/express-scheduler-app.git
   cd my-svelte-schedule-app
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Install frontend dependencies and build the Svelte app:
   ```bash
   cd svelte-app
   npm install
   npx tailwindcss -i ./src/App.svelte -o ./public/build/tailwind.css --minify
   npm run build
   cd ..
   ```

4. Run the server:
   ```bash
   node server.js
   ```

5. Open your browser and go to `http://localhost:3000` to view the app.

## License
[MIT](LICENSE)

# 予定管理アプリ

## 機能
- タスクの追加、表示、更新、削除が可能です。
- タスクはSQLiteデータベースに保存されます。
- フロントエンドはSvelteとTailwind CSSで構築されています。
- バックエンドはExpress.jsを使用しています。

## セットアップ

### 前提条件
- Node.js
- npm
- SQLite

### インストール

1. リポジトリをクローンします:
   ```bash
   git clone https://github.com/C4N4242/express-scheduler-app.git
   cd my-svelte-schedule-app
   ```

2. バックエンドの依存関係をインストールします:
   ```bash
   npm install
   ```

3. フロントエンドの依存関係をインストールし、Svelteアプリをビルドします:
   ```bash
   cd svelte-app
   npm install
   npx tailwindcss -i ./src/App.svelte -o ./public/build/tailwind.css --minify
   npm run build
   cd ..
   ```

4. サーバーを起動します:
   ```bash
   node server.js
   ```

5. ブラウザを開き、`http://localhost:3000` にアクセスしてアプリを表示します。