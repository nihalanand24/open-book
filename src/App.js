import { useState } from "react";
import { getCoverImage } from "./api/endpoints";
import getBookResults from "./api/getBookResults";
import "./App.scss";

function App() {
  const [bookTitle, setBookTitle] = useState("");
  const [results, setResults] = useState(null);

  const handleChange = (event) => {
    setBookTitle(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getBookResults(bookTitle, setResults);
  };

  return (
    <div className="App">
      <div className="wrapper">
        <h1>Booky</h1>
        <form onSubmit={e => handleSubmit(e)}>
          <input type="text" onChange={(e) => handleChange(e)} />
          <button type="submit">Search</button>
        </form>

        <div className="bookResults">
          {results && results.map(book => (
            <div className="bookCard">
              <p>{book.title}</p>
              <div className="bookCover">
                <img src={getCoverImage(book.cover_i, "l")} alt={`Book Cover for ${book.title}`} />
              </div>
            </div>
          ))

          }
        </div>

      </div>
    </div>
  );
}

export default App;
