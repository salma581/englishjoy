// Menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        navUl.classList.toggle('show');
    });
    
    // Fermer le menu quand un lien est cliqué (pour mobile)
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navUl.classList.remove('show');
            }
        });
    });
    
    // Validation du formulaire
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validation simple
            let isValid = true;
            const requiredFields = registrationForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = 'red';
                    isValid = false;
                } else {
                    field.style.borderColor = '#E0E0E0';
                }
            });
            
            // Validation de l'email
            const emailField = document.getElementById('parentEmail');
            if (emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
                emailField.style.borderColor = 'red';
                isValid = false;
            }
            
            // Validation de l'âge
            const ageField = document.getElementById('childAge');
            if (ageField && (ageField.value < 2 || ageField.value > 12)) {
                ageField.style.borderColor = 'red';
                isValid = false;
            }
            
            if (isValid) {
                // Simuler l'envoi du formulaire
                alert('Merci pour votre inscription ! Nous vous contacterons dans les 48h pour confirmer.');
                registrationForm.reset();
                
                // Redirection après 2 secondes
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            } else {
                alert('Veuillez remplir correctement tous les champs obligatoires.');
            }
        });
    }
    
    // Animation au scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.class-card, .about-section, .form-section');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Déclencher au chargement
    animateOnScroll();
    
    // Et au scroll
    window.addEventListener('scroll', animateOnScroll);
});