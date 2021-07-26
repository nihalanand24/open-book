import { useState } from "react";

const ItemSort = ({ results, setResults, originalSortOrder }) => {

    const [sortedAZ, setSortedAZ] = useState(false);
    const [sortedYear, setSortedYear] = useState(false);

    const sortAlphabetically = () => {
        const books = [...results];
        const sortedBooks = books.sort((a, b) => sortedAZ ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title));
        setResults(sortedBooks);
        setSortedAZ(!sortedAZ)
      }
    
      const sortByYearPublished = () => {
        const books = [...results];
        const sortedBooks = books.sort((a, b) => sortedYear ? a.first_publish_year - b.first_publish_year : b.first_publish_year - a.first_publish_year);
        setResults(sortedBooks);
        setSortedYear(!sortedYear);
      }

    return (
        <div className="itemSortRow">
            <button onClick={sortAlphabetically}>Sort A-Z {sortedAZ ? `🠕` : `🠗`}</button>
            <button onClick={sortByYearPublished}>Sort by Year {sortedYear ? `🠗` : `🠕`}</button>
            <button onClick={() => setResults(originalSortOrder)}>Remove Custom Sort</button>
      </div>
    )
}

export default ItemSort
