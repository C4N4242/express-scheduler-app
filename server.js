const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// データベース接続の設定
const db = new sqlite3.Database('./tasks.db');

// データベーステーブルの作成
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, completed BOOLEAN)');
});

// タスクの取得を行うエンドポイント
app.get('/api/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ tasks: rows });
    });
});

// タスクの追加を行うエンドポイント
app.post('/api/tasks', (req, res) => {
  const { text } = req.body;
  db.run('INSERT INTO tasks (text, completed) VALUES (?, ?)', [text, false], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// タスクの完了状態を更新するエンドポイント
app.put('/api/tasks/:id', (req, res) => {
  const { completed } = req.body;
  const { id } = req.params;
  db.run('UPDATE tasks SET completed = ? WHERE id = ?', [completed, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ updated: this.changes });
  });
});

// タスクを削除するエンドポイント
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM tasks WHERE id = ?', id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ deleted: this.changes });
  });
});

// Svelteのビルド済みファイルを提供
app.use(express.static(path.join(__dirname, 'svelte-app/public')));

// 他のルートがアクセスされた場合はindex.htmlを返す
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'svelte-app/public/index.html'));
});

// ポート設定
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
