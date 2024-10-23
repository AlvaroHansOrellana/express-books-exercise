const books = require('./data/books.json');
const express = require("express"); // Importamos el paquete express
const app = express(); // Inciializar servidor con express
const port = 3000; // Puerto a usar por el servidor

app.use(express.json()); // Middleware para parsear el body de las peticiones

// Access to all the books URL
app.get("/all", (req, res) => {
    res.send(books)
});

app.get("/first", (req, res) => {
    res.send(books[0])
});

// Para ruta no existente
app.use("*",(req, res) => {
  res.status(404).send("Ruta no encontrada");
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});