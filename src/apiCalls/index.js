import axios from 'axios';

export const checkUserInfo = (info) => axios.post(
    'http://localhost:3001/user/login',
    info
    
).then(response => response)
.catch(err => {
    if (err) throw err;
});

/* export const checkIfAuth = () => axios.post(
    'http://localhost:3001/user/check',
    sessionStorage.
) */