const app = require('./app');
const express = require('express');


const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Welcome to the URL Shortener API!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
