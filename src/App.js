import { useEffect, useState } from "react";
import { getCoverImage } from "./api/endpoints";
import getBookResults from "./api/getBookResults";
import "./App.scss";

function App() {
  const [bookTitle, setBookTitle] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [failure, setFailure] = useState(false);
  const [searchFlag, setSearchFlag] = useState(false);
  const [originalSortOrder, setOriginalSortOrder] = useState([]);

  const handleChange = (event) => {
    setSearchFlag(false);
    setBookTitle(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    getBookResults(bookTitle, setResults, setLoading, setFailure, setSearchFlag, setOriginalSortOrder);
  };


  const sortAlphabetically = () => {
    const books = [...results];
    const sortedBooks = books.sort((a, b) => a.title.localeCompare(b.title));
    setResults(sortedBooks);
  }

  const sortByYearPublished = () => {
    const books = [...results];
    const sortedBooks = books.sort((a, b) => b.first_publish_year - a.first_publish_year);
    setResults(sortedBooks);
  }

  const getAuthorsListString = authorsArray => {
    if (authorsArray.length > 1) {
      let authorsString = '';
      authorsArray.forEach((author, index) => {
        switch (index) {
          case 0:
            authorsString += author;
            break;
          case authorsArray.length - 1:
            authorsString += ` & ${author}`;
            break;
          default:
            authorsString += `, ${author}`
            break;
        }
      })
      return authorsString;
    } else {
      return authorsArray[0];
    }
  }


  return (
    <div className="App">
      <div className="wrapper">
        <h1>Booky</h1>
        <form onSubmit={e => handleSubmit(e)}>
          <input type="text" onChange={(e) => handleChange(e)} />
          <button type="submit">Search</button>
        </form>


        <button onClick={sortAlphabetically}>Sort Alphabetically {}</button>
        <button onClick={sortByYearPublished}>Sort by Year</button>
        <button onClick={() => setResults(originalSortOrder)}>Remove Custom Sort</button>
        {loading ? <p className="loading">Loading Results</p>
          : failure ? <p>Error Loading Data from API. Please try later.</p> 
          : results.length ? 
          <div className="bookResults">
            {results.map(book => (
              <div key={book.key} className="bookCard">
                <p>{book.title}</p>
                <p>{book.first_publish_year}</p>
                <p>By: {getAuthorsListString(book.author_name)}</p>
                <div className="bookCover">
                  {book.cover_i ? <img 
                    src={getCoverImage(book.cover_i, "m")} 
                    alt={`Book Cover for ${book.title}`} 
                    />
                  : <div className="noImage">
                      <p>No image available</p>
                    </div> 
                  }
                </div>
              </div>
            ))}
          </div>
          : searchFlag && <p>No Results Found for {bookTitle}</p>
        }

      </div>
    </div>
  );
}

export default App;
