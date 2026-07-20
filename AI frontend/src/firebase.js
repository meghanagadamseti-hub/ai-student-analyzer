import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQru4Q9Me_ZbVj9Bicv3lUn0deBMJTc1o",
  authDomain: "ai-student-analyzer-b6b9e.firebaseapp.com",
  projectId: "ai-student-analyzer-b6b9e",
  storageBucket: "ai-student-analyzer-b6b9e.firebasestorage.app",
  messagingSenderId: "811224642226",
  appId: "1:811224642226:web:623a68af019bfc321b4fab",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);