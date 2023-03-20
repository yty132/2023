const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let names = [];
let id = 0; // id값 초기화

app.get('/names', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.json(names);
});

app.post('/names', (req, res) => {
  const name = req.body.name;
  const time = new Date().toLocaleString();
  const item = { id: ++id, name, time }; // id 할당
  names.push(item);
  console.log(names);
  res.header('Access-Control-Allow-Origin', '*');
  res.json({ message: 'success' });
});

app.delete('/names', (req, res) => {
  names = [];
  id = 0;
  console.log(names);
  res.header('Access-Control-Allow-Origin', '*');
  res.json({ message: 'success' });
});

app.delete('/names/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = names.findIndex(item => item.id === id);
  if (index >= 0) {
    names.splice(index, 1);
    console.log(names);
    res.json({ message: 'success' });
  } else {
    res.status(404).json({ message: 'not found' });
  }
});

const PORT = 3000;
const HOST = '114.70.21.213';

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
