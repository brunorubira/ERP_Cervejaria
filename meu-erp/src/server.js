// server.js
const express = require('express');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const app = express();
const port = 3001;

app.use(express.json());

let db;

// Inicializa o banco de dados SQLite e inicia o servidor
const initializeDatabase = async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS stock (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL
    )
  `);

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
};

initializeDatabase();

// Rotas para manipular o estoque
app.get('/api/stock', async (req, res) => {
  const stockItems = await db.all('SELECT * FROM stock');
  res.json(stockItems);
});

app.post('/api/stock', async (req, res) => {
  const { name, quantity } = req.body;

  if (!name || !quantity) {
    return res.status(400).json({ error: 'Nome e quantidade são obrigatórios' });
  }

  const result = await db.run('INSERT INTO stock (name, quantity) VALUES (?, ?)', [name, quantity]);
  const newItem = await db.get('SELECT * FROM stock WHERE id = ?', result.lastID);

  res.json(newItem);
});

app.put('/api/stock/:id', async (req, res) => {
  const { name, quantity } = req.body;
  const itemId = req.params.id;

  if (!name || !quantity) {
    return res.status(400).json({ error: 'Nome e quantidade são obrigatórios' });
  }

  await db.run('UPDATE stock SET name = ?, quantity = ? WHERE id = ?', [name, quantity, itemId]);
  const updatedItem = await db.get('SELECT * FROM stock WHERE id = ?', itemId);

  res.json(updatedItem);
});

app.delete('/api/stock/:id', async (req, res) => {
  const itemId = req.params.id;

  await db.run('DELETE FROM stock WHERE id = ?', itemId);
  res.json({ message: 'Item removido com sucesso' });
});
