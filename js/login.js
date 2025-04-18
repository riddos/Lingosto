import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBwYxsjKgQWynx7k0iALM1U7p_KIOPeYVk",
  authDomain: "lingosto.firebaseapp.com",
  projectId: "lingosto",
  storageBucket: "lingosto.firebasestorage.app",
  messagingSenderId: "433536212857",
  appId: "1:433536212857:web:e1bf2d61585f65c57f19a8",
  measurementId: "G-T0M1QSQJ5N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed"); // Debugging log to confirm script is running
  const form = document.getElementById("login-form");

  if (!form) {
    console.error("Login form not found. Ensure the form has the correct ID.");
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    console.log("Login form submitted"); // Debugging log to confirm event listener is working

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("Attempting login with:", email); // Log the email being used

    if (!email || !password) {
      alert("Please fill in both email and password fields.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Successfully logged in:", user);
        window.location.href = "/en/dashboard.html"; // Updated path to use absolute path from root
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error during login:", errorCode, errorMessage); // Log error details
        alert("Login failed: " + errorMessage); // Display error message
      });
  });
});
