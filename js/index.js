document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const languageBtn = document.querySelector('.language-btn');
    const languageDropdown = document.querySelector('.language-dropdown');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const profileBtn = document.getElementById("profile-btn");
    let currentSlide = 0;

    if (profileBtn) {
        profileBtn.addEventListener("click", () => {
            const isLoggedIn = localStorage.getItem('user') !== null;
            window.location.href = isLoggedIn ? "/profile.html" : "/login.html";
        });
    }

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    setInterval(nextSlide, 5000);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('visible');
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.menu') && !event.target.closest('.menu-toggle')) {
            menu.classList.remove('visible');
        }
    });

    if (languageBtn) {
        languageBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            languageDropdown.classList.toggle('show');
        });
    }

    document.addEventListener('click', () => {
        languageDropdown.classList.remove('show');
    });

    const cards = document.querySelectorAll(".feature-card-inner");
    if (cards.length > 0) {
        cards.forEach((card) => {
            card.addEventListener("click", (event) => {
                event.stopPropagation();
                document.querySelectorAll(".feature-card-inner.clicked").forEach((otherCard) => {
                    if (otherCard !== card) {
                        otherCard.classList.remove("clicked");
                    }
                });
                card.classList.toggle("clicked");
            });
        });
    }

    document.addEventListener("click", () => {
        document.querySelectorAll(".feature-card-inner.clicked").forEach((card) => {
            card.classList.remove("clicked");
        });
    });

    const howToReadLink = document.querySelector('a[href="index.html#how-to-read"]');
    const targetSection = document.getElementById("how-to-read");

    if (howToReadLink && targetSection) {
        howToReadLink.addEventListener("click", (event) => {
            event.preventDefault();
            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    }
});
