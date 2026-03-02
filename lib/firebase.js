import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; 

const firebaseConfig = {
  apiKey: "AIzaSyAhtWZAOYF3f_r4TOQNdIE5hnBgjKwDCvk",
  databaseURL: "https://kel1-caascps-acea3-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);