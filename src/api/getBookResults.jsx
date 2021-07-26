import axios from "axios"
import { titleBaseUrl } from "./endpoints"

const getBookResults = async ( title, setResults, setLoading, setFailure, setSearchFlag, setOriginalSortOrder ) => {
    setSearchFlag(false);
    try {
        const response = await axios(`${titleBaseUrl}${title}&limit=8`);
        const results = response.data.docs;
        setResults(results);
        setLoading(false);
        setFailure(false);
        setOriginalSortOrder(results);
    } catch (error) {
        console.log(error);
        setLoading(false);
        setFailure(true);
    }
    setSearchFlag(true);

}

export default getBookResults
