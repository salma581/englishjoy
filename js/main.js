document.addEventListener('DOMContentLoaded', function() {

    // 1️⃣ Menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');
    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', function() {
            navUl.classList.toggle('show');
            menuToggle.setAttribute('aria-expanded', navUl.classList.contains('show'));
        });
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navUl.classList.remove('show');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // 2️⃣ Animation au scroll pour les sections générales
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.class-card, .about-section');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // 3️⃣ Animation de la section colo (texte + liste + cartes)
    const coloCard = document.querySelector('.colo-card-pro');
    if (coloCard) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animation carte colo
                    coloCard.style.opacity = '1';
                    coloCard.style.transform = 'translateY(0)';

                    // Texte et info
                    const textElements = coloCard.querySelectorAll('.colo-text, .colo-info');
                    textElements.forEach(el => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0) scale(1)';
                    });

                    // Liste avec "staggered animation"
                    const listItems = coloCard.querySelectorAll('.colo-list li');
                    listItems.forEach((li, index) => {
                        li.style.transitionDelay = `${index * 0.15}s`;
                        li.style.opacity = '1';
                        li.style.transform = 'translateY(0) scale(1)';
                    });

                    // Cartes galerie
                    const mediaCards = coloCard.querySelectorAll('.media-card');
                    mediaCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, index * 150);
                    });
                }
            });
        }, { threshold: 0.2 });

        observer.observe(coloCard);
    }
const listItems = coloCard.querySelectorAll('.colo-list li');

listItems.forEach((li, index) => {
  // apparition avec décalage
  setTimeout(() => {
    li.style.opacity = '1';
    li.style.transform = 'translateY(0) scale(1)';
    
    // ajoute l'effet flottant
    li.classList.add('float');
  }, index * 200); // 0.2s de décalage entre chaque bulle
});

    // 4️⃣ Chargement progressif des images de la galerie
    const images = document.querySelectorAll('.media-card img');
    images.forEach(img => {
        img.style.opacity = '0';
        setTimeout(() => {
            img.style.transition = 'opacity 0.5s ease';
            img.style.opacity = '1';
        }, 300);
    });
const btn = document.getElementById("seeMoreBtn");
const hiddenCards = document.querySelectorAll(".photo-card.is-hidden"); 

if (btn && hiddenCards.length > 0) {
    let expanded = false;

    btn.addEventListener("click", () => {
        hiddenCards.forEach(card => {
            if (!expanded) {
                card.classList.remove("is-hidden");
                card.classList.add("is-visible");

                // animation fadeIn
                card.style.animation = "none";
                card.offsetHeight; // force reflow
                card.style.animation = "fadeIn 0.6s ease forwards";
            } else {
                card.classList.remove("is-visible");
                card.classList.add("is-hidden");
            }
        });

        btn.textContent = expanded ? "Voir plus" : "Voir moins";
        expanded = !expanded;
    });
}


});
