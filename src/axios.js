import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:4545",
    withCredentials: true
});

export default instance;


// http://localhost:4545