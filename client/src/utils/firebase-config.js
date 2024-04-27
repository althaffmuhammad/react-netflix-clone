import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
// import {GOOGLE_API_KEY} from '../api';

const firebaseConfig = {
  // apiKey: GOOGLE_API_KEY,
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: 'react-netflix-clone-8a912.firebaseapp.com',
  projectId: 'react-netflix-clone-8a912',
  storageBucket: 'react-netflix-clone-8a912.appspot.com',
  messagingSenderId: '519113311144',
  appId: '1:519113311144:web:0aca8407ec02a08aa3d39d',
  measurementId: 'G-GEG8YMPJL8',
};

const app = initializeApp (firebaseConfig);
export const firebaseAuth = getAuth (app);
