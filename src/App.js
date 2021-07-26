import { useState } from "react";
import getBookResults from "./api/getBookResults";
import "./App.scss";
import BookCard from "./components/BookCard";
import ItemSort from "./components/ItemSort";


function App() {
  const [bookTitle, setBookTitle] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [failure, setFailure] = useState(false);
  const [searchFlag, setSearchFlag] = useState(false);
  const [originalSortOrder, setOriginalSortOrder] = useState([]);
  const [searchedTitle, setSearchedTitle] = useState("");

  const handleChange = (event) => {
    setBookTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    getBookResults(bookTitle, setResults, setLoading, setFailure, setSearchFlag, setOriginalSortOrder);
    setSearchedTitle(bookTitle);
  };


  return (
    <div className="App">
      <div className="wrapper">
        <h1>Booky</h1>
        <form onSubmit={e => handleSubmit(e)}>
          <input type="text" onChange={(e) => handleChange(e)} />
          <button type="submit">Search</button>
        </form>

        <ItemSort 
          results={results}
          setResults={setResults}
          originalSortOrder={originalSortOrder}
        />

        {loading ? <p className="loading">Loading Results</p>
          : failure ? <p>Error Loading Data from API. Please try later.</p> 
          : results.length ? 
          <div className="bookResults">
            {results.map(book => (
              <BookCard 
                key={book.key}
                worksUrl={book.key}
                title={book.title}
                year={book.first_publish_year}
                author={book.author_name}
                coverID={book.cover_i}
              />
            ))}
          </div>
          : searchFlag && 
          <p>No Results Found for {searchedTitle}</p>
        }
      </div>
    </div>
  );
}

export default App;
