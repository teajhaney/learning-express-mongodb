const express = require('express');
const app = express();
const port = 3000;

//middleware
app.use(express.json());

const books = [
  {
    id: '1',
    title: 'book 1',
  },
  {
    id: '2',
    title: 'book 2',
  },
];

//intro routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to our book store',
  });
});

//get books
app.get('/books', (req, res) => {
  res.json(books);
});

//get single book based on id
app.get('/books/:id', (req, res) => {
  const id = req.params.id;
  const book = books.find(book => book.id === id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({
      message: 'Book not found! Please try again with a different book ID',
    });
  }
});

//add a new book
app.post('/add', (req, res) => {
  const newBook = {
    id: `${Math.floor(Math.random() * 1000)}`,
    title: `book ${Math.floor(Math.random() * 1000)}`,
  };
  books.push(newBook);

  res.status(200).json({
    data: newBook,
    message: 'success',
  });
});

//update new book
app.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const findCurrentBook = books.findIndex(book => book.id === id);

  if (findCurrentBook) {
    findCurrentBook.title = req.body.title || findCurrentBook.title;
    res.status(200).json({
      data: findCurrentBook,
      message: `Book with ID ${id} updated successfully`,
    });
  } else {
    res.status(404).json({
      message: 'Book not found! Please try again with a different book ID',
    });
  }
});

//delete book by index
app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  const findIndex = books.find(book => book.id == id);
  if (findIndex !== -1) {
    const deleteBook = books.splice(findIndex, 1);
    res.status(200).json({
      data: deleteBook[0],
      message: 'Book deleted successfully',
    });
  } else {
    res.status(404).json({
      message: 'Book not found! Please try again with a different book ID',
    });
  }
});

app.listen(port, () => {
  console.log(`server started on port: ${port}`);
});
