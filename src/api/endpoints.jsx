export const titleBaseUrl = 'https://openlibrary.org/search.json?title=';
export const amazonCaBaseUrl = 'https://www.amazon.ca/dp/';
export const getCoverImage = (coverID, size) => size ? `http://covers.openlibrary.org/b/id/${coverID}-${size.toUpperCase()}.jpg` : `http://covers.openlibrary.org/b/id/${coverID}.jpg`