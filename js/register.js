import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBwYxsjKgQWynx7k0iALM1U7p_KIOPeYVk",
  authDomain: "lingosto.firebaseapp.com",
  projectId: "lingosto",
  storageBucket: "lingosto.firebasestorage.app",
  messagingSenderId: "433536212857",
  appId: "1:433536212857:web:e1bf2d61585f65c57f19a8",
  measurementId: "G-T0M1QSQJ5N"
};

console.log("Form element:", document.getElementById("register-form"));


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  const form = document.getElementById("register-form");

  form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    alert("works");
  });
});