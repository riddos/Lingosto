// Firebase yapılandırmasını burada yapıyoruz
const firebaseConfig = {
    apiKey: "AIzaSyBwYxsjKgQWynx7k0iALM1U7p_KIOPeYVk",
    authDomain: "lingosto.firebaseapp.com",
    projectId: "lingosto",
    storageBucket: "lingosto.appspot.com",
    messagingSenderId: "433536212857",
    appId: "1:433536212857:web:9af9843418cbda347f19a8",
    measurementId: "G-XP38M8F7RD"
};

// Firebase başlat
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Kayıt formunu seç ve olayı dinle
document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("register-form");

    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Kullanıcıdan email ve şifreyi al
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            // Firebase Authentication ile kayıt ol
            auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    alert("Kayıt başarılı! 🎉");
                    console.log("Kullanıcı:", userCredential.user);
                    window.location.href = "login.html"; // Kullanıcıyı giriş sayfasına yönlendir
                })
                .catch((error) => {
                    alert("Hata: " + error.message);
                });
        });
    }
});
