// Firebase yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyBwYxsjKgQWynx7k0iALM1U7p_KIOPeYVk",
  authDomain: "lingosto.firebaseapp.com",
  projectId: "lingosto",
  storageBucket: "lingosto.appspot.com",
  messagingSenderId: "433536212857",
  appId: "1:433536212857:web:e1bf2d61585f65c57f19a8",
  measurementId: "G-XP38M8F7RD"
};

// Firebase başlat
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Oturum durumunu izle
auth.onAuthStateChanged(user => {
  const currentPath = window.location.pathname.split('/').pop();
  
  if (user) {
      // Kullanıcı giriş yapmış
      console.log("Kullanıcı giriş yaptı:", user.email);
      if (currentPath === 'login.html' || currentPath === 'register.html') {
          window.location.href = 'dashboard.html';
      }
  } else {
      // Kullanıcı giriş yapmamış
      console.log("Kullanıcı giriş yapmamış");
      if (currentPath === 'dashboard.html') {
          window.location.href = 'login.html';
      }
  }
});

// Kayıt formu işlemi
document.getElementById("register-form")?.addEventListener("submit", function(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
          alert("Kayıt başarılı! Giriş yapabilirsiniz.");
          window.location.href = "login.html";
      })
      .catch(error => {
          alert("Hata: " + error.message);
      });
});

// Giriş formu işlemi
document.getElementById("login-form")?.addEventListener("submit", function(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
      .then(() => {
          window.location.href = "dashboard.html";
      })
      .catch(error => {
          alert("Hata: " + error.message);
      });
});

// Çıkış işlemi
document.getElementById("logout-btn")?.addEventListener("click", function() {
  auth.signOut()
      .then(() => {
          window.location.href = "login.html";
      })
      .catch(error => {
          console.error("Çıkış hatası:", error);
      });
});