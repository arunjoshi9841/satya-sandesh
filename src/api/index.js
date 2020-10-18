import axios from 'axios';
import config from '../config';
import firebase from 'firebase';
let instance = axios.create({ baseURL: config.service.url });

const getToken = async () => {
  return new Promise((resolve, reject)=>{
    firebase
    .auth()
    .currentUser.getIdToken(/* forceRefresh */ true)
    .then(function (idToken) {
      resolve(idToken);
    })
    .catch(function (error) {
      reject();
    });
  })
  };
  

instance.interceptors.request.use(
  async function (config) {
    try{
      let token = await getToken();
      config.headers.Authorization = 'Bearer ' + token;
    }catch(e){
      config.headers.Authorization = 'Bearer ' + "";
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default instance;
