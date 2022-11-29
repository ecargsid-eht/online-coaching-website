// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAx3y9U-BYMALZy4UCatqTT418dIR-xpdE",
  authDomain: "student-portal-6580a.firebaseapp.com",
  projectId: "student-portal-6580a",
  storageBucket: "student-portal-6580a.appspot.com",
  messagingSenderId: "1047033548039",
  appId: "1:1047033548039:web:590da547fd4f3b5f5849a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export default app;

