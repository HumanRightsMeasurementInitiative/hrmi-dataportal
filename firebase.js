import firebase from 'firebase/app';
import 'firebase/storage';

// NOTE: these values should be changed for the correct deployment target.
// This is not a long-term solution - instead we will use dotenv with the new Vercel / Nextjs refactor.
const firebaseConfig = {
  apiKey: 'AIzaSyBl1-rIYPP73iMHWHM_yI2vFlr4OShb30w',
  authDomain: 'rightstracker-2021-embargoed.firebaseapp.com',
  projectId: 'rightstracker-2021-embargoed',
  storageBucket: 'rightstracker-2021-embargoed.appspot.com',
  messagingSenderId: '577415063729',
  appId: '1:577415063729:web:d426a78f7ed95bc1869a90',
};

if (firebase.apps.length < 1) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
