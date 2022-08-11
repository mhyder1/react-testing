import React from 'react';
// import "./App.css";
import Book from './Book';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [books, setBooks] = React.useState([]);
  const [value, setValue] = React.useState('');
  React.useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => setBooks(data.map(({ name, id }) => ({ name, id }))));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value && value !== '') {
      const data = {
        name: value,
      };
      fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((result) => {
          setBooks([...books, { ...result, id: uuidv4() }]);
          setValue('');
        });
    }
  };
  const handleDelete = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        setBooks(books.filter((book) => book.id !== id));
      });
  };

  const handleEdit = (id, name) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .then((result) => {
        setBooks(
          books.map((book) => {
            if (book.id !== id) return book;
            return result;
          })
        );
      });
  };

  return (
    <div className="App">
      <h1>Favorite Books</h1>
      <p>Keep track of your favorites!</p>
      <ul>
        {books.map(({ name, id }) => (
          <Book
            key={id}
            value={name}
            handleEdit={(newValue) => handleEdit(id, newValue)}
            handleDelete={() => handleDelete(id)}
          />
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="eg. The Great Gatsby"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default App;
