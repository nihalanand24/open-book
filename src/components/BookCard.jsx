import { getCoverImage, openLibraryUrl } from "../api/endpoints";

const BookCard = ({ worksUrl, title, year, author, coverID }) => {
  
    const getAuthorsListString = (authorsArray) => {
    if (authorsArray.length > 1) {
      let authorsString = "";
      authorsArray.forEach((author, index) => {
        switch (index) {
          case 0:
            authorsString += author;
            break;
          case authorsArray.length - 1:
            authorsString += ` & ${author}`;
            break;
          default:
            authorsString += `, ${author}`;
            break;
        }
      });
      return authorsString;
    } else {
      return authorsArray[0];
    }
  };

  return (
    <div className="bookCard">
      <p>{title} <span>({year})</span></p>
      <p>
        By: {author ? getAuthorsListString(author) : "N/A"}
      </p>
      <div className="bookCover">
        {coverID ? (
          <img
            src={getCoverImage(coverID, "m")}
            alt={`Book Cover for ${title}`}
          />
        ) : (
          <div className="noImage">
            <p>No image available</p>
          </div>
        )}
        <a href={openLibraryUrl + worksUrl} target="_blank" rel="noreferrer">View on Open Library</a>
      </div>
    </div>
  );
};

export default BookCard;
