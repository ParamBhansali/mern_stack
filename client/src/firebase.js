// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCHHwjgSlyYdwO-l-lMtEbmojI481XXpmQ',
  authDomain: "mern-stack-f1f4a.firebaseapp.com",
  projectId: "mern-stack-f1f4a",
  storageBucket: "mern-stack-f1f4a.appspot.com",
  messagingSenderId: "38594641317",
  appId: "1:38594641317:web:ac1551725e0cc08b3c3c4c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);