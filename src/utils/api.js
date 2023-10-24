import axios from "axios";

const BASE_URL = "https://youtube138.p.rapidapi.com";

const options = {
    params: { hl: "en", gl: "US" },
    headers: {
        'X-RapidAPI-Key': '364fd396admsh2f9dbf18fecdab7p1e98f8jsnbb96bdf82dc1',
        'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    },
};

const fetchDataYoutube = async (url) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    return data;
};
export default fetchDataYoutube
