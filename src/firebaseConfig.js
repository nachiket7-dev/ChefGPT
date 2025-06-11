import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBUxl-PffrI9ZmkahX3ey8V_gqjCgJf7Mk",
  authDomain: "chefgpt-4705b.firebaseapp.com",
  projectId: "chefgpt-4705b",
  storageBucket: "chefgpt-4705b.appspot.com",
  messagingSenderId: "792044693275",
  appId: "1:792044693275:web:02112a733f25d6594055be",
  measurementId: "G-NFWFGPPHB3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
