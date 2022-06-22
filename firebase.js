import firebase from 'firebase/app';
import 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// NOTE: these values should be changed for the correct deployment target.
// This is not a long-term solution - instead we will use dotenv with the new Vercel / Nextjs refactor.
const firebaseConfig = {
  apiKey: 'AIzaSyDZGRvfoRxeB2m8nL_C1yVq55SJPXgYk_M',
  authDomain: 'hrmi-dataportal-uat.firebaseapp.com',
  projectId: 'hrmi-dataportal-uat',
  storageBucket: 'hrmi-dataportal-uat.appspot.com',
  messagingSenderId: '1007539889235',
  appId: '1:1007539889235:web:0c367be8ad49f0dc34d2a6',
  measurementId: 'G-X82CBX9NLW',
};

const app = firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export default firebase;
