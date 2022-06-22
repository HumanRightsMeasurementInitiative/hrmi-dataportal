import firebase from 'firebase/app';
import 'firebase/storage';

// NOTE: these values should be changed for the correct deployment target.
// This is not a long-term solution - instead we will use dotenv with the new Vercel / Nextjs refactor.
const firebaseConfig = {
  apiKey: 'AIzaSyAPR0rUorI5CEQguoUfjm8_0mSasH3X9d4',
  authDomain: 'hrmi-dataportal.firebaseapp.com',
  projectId: 'hrmi-dataportal',
  storageBucket: 'hrmi-dataportal.appspot.com',
  messagingSenderId: '478758585192',
  appId: '1:478758585192:web:53cec2a41b431500574cdd',
};

export default firebaseConfig;
