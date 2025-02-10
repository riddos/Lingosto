// Firebase Yapılandırma
const firebaseConfig = {
    apiKey: "AIzaSyBwYxsjKgQWynx7k0iALM1U7p_KIOPeYVk",
    authDomain: "lingosto.firebaseapp.com",
    projectId: "lingosto",
    storageBucket: "lingosto.firebasestorage.app",
    messagingSenderId: "433536212857",
    appId: "1:433536212857:web:9af9843418cbda347f19a8",
};

// Firebase Başlat
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Kayıt Olma İşlemi
document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Sayfanın yenilenmesini engelle

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Kayıt başarılı! ✅");
            window.location.href = "dashboard.html"; // Kullanıcıyı yönlendir
        })
        .catch((error) => {
            alert("Hata: " + error.message);
        });
});
