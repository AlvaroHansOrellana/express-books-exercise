const books = require('./data/books.json');
const express = require("express"); // Importamos el paquete express
const app = express(); // Inciializar servidor con express
const port = 3000; // Puerto a usar por el servidor

app.use(express.json()); // Middleware para parsear el body de las peticiones



// Access to all the books URL
app.get("/all", (req, res) => {
    res.send(books)
});

// Crea una ruta /first para obtener el primer libro
app.get("/first", (req, res) => {
    res.send(books[0])
});

// Crea una ruta /last para obtener el último libro
app.get("/last", (req, res) => {
  res.send(books[books.length - 1]);
});

// Crea una ruta /middle para obtener el libro en la mitad (número 50 en el array)
app.get("/middle", (req, res) => {
  res.send(books[books.length - 1] / 2)
});

// Crea una ruta /author/dante-alighieri para obtener SÓLO EL TÍTULO del libro de Dante Alighieri
app.get("/author/dante-alighieri", (req, res) => {
  books.forEach(book => {
    if (book.author === "Dante Alighieri") {
      res.send(book.author)
    }
  });
});


// Crea una ruta /country/charles-dickens para obtener SÓLO EL PAÍS del libro de Charles Dickens
app.get("/country/charles-dickens", (req, res) => {
  books.forEach(book => {
    if (book.author === "Charles Dickens") {
      res.send(book.country)
    }
  });
});

// Crea una ruta /year&pages/cervantes para obtener LAS PÁGINAS Y EL AÑO del libro de Miguel de Cervantes, Ejemplo de respuesta: { pages: ..., year: ... }
app.get("/year&pages/cervantes", (req, res) => {
  books.forEach(book => {
    if (book.author === "Miguel de Cervantes") {
      res.send({ pages: book.pages, year: book.year })
    }
  });
});

// Crea una ruta /country/count/spain para obtener EL NÚMERO DE LIBROS de España
app.get("/country/count/spain", (req, res) => {
  let numBooksSpain = 0;
  books.forEach(book => {
    if (book.country === "Spain") {
      numBooksSpain += 1;
    }
  });
  res.send(numBooksSpain.toString())
});
// !
// app.get("/country/count/spain", (req, res) => {
//   const numBooksSpain = books.filter(book => book.country === "Spain").length;
//   res.send(numBooksSpain.toString());
// });

// Crea una ruta /country/at-least/germany para obtener VERDADERO O FALSO dependiendo de si hay o no un libro de Alemania
app.get("/country/at-least/germany", (req, res) => {
  let booksGermany = false;
  books.forEach(book => {
    if (book.country === "Germany") {
      booksGermany = true;
    }
  });
  res.send(booksGermany.toString())
})

// Crea una ruta /pages/all-greater/200 para obtener VERDADERO O FALSO dependiendo de si todos los libros tienen más de 200 páginas
app.get("/pages/all-greater/200", (req, res) => {
  let booksGreater = true;
  books.forEach(book => {
    if (book.pages <= 200 ) {
      booksGreater = false;
    }
  });
  res.send(booksGreater.toString())
})


// Para ruta no existente
app.use("*",(req, res) => {
  res.status(404).send("Ruta no encontrada");
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});





