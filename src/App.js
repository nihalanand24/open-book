import { useState } from "react";
import getBookResults from "./api/getBookResults";
import './styles/styles.scss'
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
        <div 
          className="coreContainer"
          style={!results.length ? {paddingTop: '25vh'} : {}}
          >
          
          <h1>
            <span onClick={() => window.location.reload()}>
              Open Book
            </span>
          </h1>
          <h2>Search for books by title</h2>


          <form onSubmit={e => handleSubmit(e)}>
            <input required type="text" onChange={(e) => handleChange(e)} />
            <button type="submit">Search</button>
          </form>

          <ItemSort 
            results={results}
            setResults={setResults}
            originalSortOrder={originalSortOrder}
          />
        </div>

        {loading ? <div className="message"><p className="loading">Loading Results</p></div>
          : failure ? <div className="message"><p className="error">Error Loading Data from API. Please try later.</p></div>
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
          <div className="message"><p className="noResults">No Results Found for {searchedTitle}</p></div>
        }

      </div>
    </div>
  );
}

export default App;
