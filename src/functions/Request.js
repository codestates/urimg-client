import axios from 'axios';

axios.defaults.withCredentials = true;

export const refreshAccessToken = (callback) => {
    axios.get(process.env.REACT_APP_API_URL+'/user/accesstoken',)
        .then(resp=>{
            callback()
        })
        .catch(err=>{
            console.log(err)
        })
}