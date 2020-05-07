import axios from 'axios';

const instance = axios.create({
    withCredentials: true
});

export default instance;

// 
// http://localhost:4545