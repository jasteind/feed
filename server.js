const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000; // Port som brukes av Render

// Les JSON-filen
const data = JSON.parse(fs.readFileSync('example.json', 'utf-8'));

// Rute for å søke etter e-post
app.get('/feed/example.json', (req, res) => {
  const email = req.query.email; // Henter email fra URL-spørsmålet (?email=...)
  if (!email) {
    return res.status(400).send([]); // Returnerer en tom liste hvis email mangler
  }

  const result = data.find(user => user.email === email);

  if (!result) {
    return res.status(404).send([]); // Returnerer en tom liste hvis ingen treff finnes
  }

  res.json([result]); // Pakk resultatet inn i en liste
});

// Start serveren
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
