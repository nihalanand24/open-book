import axios from "axios"
import { titleBaseUrl } from "./endpoints"

const getBookResults = async ( title, setResults, setLoading, setFailure, setSearchFlag, setOriginalSortOrder ) => {
    setSearchFlag(false);
    try {
        const response = await axios(`${titleBaseUrl}${title}`);
        const results = response.data.docs;
        setResults(results.slice(0, 8));
        setLoading(false);
        setFailure(false);
        setOriginalSortOrder(results.slice(0, 8));
    } catch (error) {
        console.log(error);
        setLoading(false);
        setFailure(true);
    }
    setSearchFlag(true);

}

export default getBookResults
