import express from "express";

const app = express();
const PORT = 3030;

const books = [
  { id: 1, title: "Valami szép", author: "Béla" },
  { id: 2, title: "Nem Tom", author: "Ilona" },
  { id: 3, title: "Erdő szelleme", author: "Sanyi" },
  { id: 4, title: "Finom tányér", author: "Géza" },
];

app.get("/books", (req, res) => {
  res.status(200).json(books);
});

app.get("/books/:id", (req, res) => {
  const id = +req.params.id;
  const book = books.find((book) => book.id === id);
  if (!book) {
    return res.status(400).json({ message: "Book not found!" });
  }
  res.status(200).json(book);
});

app.post("/books", (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: "Invalid information!" });
  }
  const id = books[books.length - 1]?.id + 1;
  const book = { id, title, author };
  books.push(book);
  res.status(201).json(book);
});

app.put("/books/:id", (req, res) => {
  const id = +req.params.id;
  let book = books.find((book) => book.id === id);
  if (!book) {
    return res.status(404).json({ message: "Book not found!" });
  }
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: "Invalid information!" });
  }
  const index = books.indexOf(book);
  book = { id, title, author };
  books[index] = book;
  res.status(200).json(book);
});

app.delete("/books/:id", (req, res) => {
  const id = +req.params.id;
  let book = books.find((book) => book.id === id);
  if (!book) {
    return res.status(404).json({ message: "Book not found!" });
  }
  const index = books.indexOf(book);
  books.splice(index, 1);
  res.status(200).json({ message: "Deleted successfully!" });
});

app.listen(PORT, () => {
  console.log(`Server runs on ${PORT}`);
});
