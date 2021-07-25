import axios from "axios"
import { titleBaseUrl } from "./endpoints"

const getBookResults = async (title, setResults) => {
    
    const response = await axios(`${titleBaseUrl}${title}`);
    const results = response.data.docs;
    setResults(results.slice(0, 15));

}

export default getBookResults
