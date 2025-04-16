import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

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
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  const form = document.getElementById("register-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // User successfully registered
        const user = userCredential.user;

        // Save the username to Firestore
        await setDoc(doc(db, "users", user.uid), {
          username: username,
          email: email,
          createdAt: new Date().toISOString()
        });

        window.location.href = "../en/dashboard.html"; // Redirect to dashboard.html
      })
      .catch((error) => {
        // Handle errors
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage); // Display error message
      });
  });
});