const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('<h1>Welcome to DevOps7.3 Web Server</h1><p>Site loads successfully!</p>');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});