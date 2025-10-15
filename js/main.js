document.addEventListener('DOMContentLoaded', function() {
    // ==================== MENU MOBILE ====================
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

    // ==================== ANIMATIONS AU SCROLL ====================
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
    
    // Initialisation
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    document.addEventListener('DOMContentLoaded', function() {
    // Effet de chargement progressif des images
    const images = document.querySelectorAll('.photo-card img');
    
    images.forEach(img => {
        img.style.opacity = '0';
        setTimeout(() => {
            img.style.transition = 'opacity 0.5s ease';
            img.style.opacity = '1';
        }, 300);
    });

    // Animation au scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.photo-card').forEach(card => {
        observer.observe(card);
    });
});
});