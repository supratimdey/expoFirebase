// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {initializeAuth , getReactNativePersistence} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import  ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"
 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjvoyAccP759GYy3JHOclhDXXjU_By9Vs",
  authDomain: "web-quickstart-734ba.firebaseapp.com",
  databaseURL: "https://web-quickstart-734ba.firebaseio.com",
  projectId: "web-quickstart-734ba",
  storageBucket: "web-quickstart-734ba.appspot.com",
  messagingSenderId: "706937117713",
  appId: "1:706937117713:web:ad5d3360e521adbf2c25b0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, { persistence: getReactNativePersistence(ReactNativeAsyncStorage)});
export const db = getFirestore(app);
