document.addEventListener('DOMContentLoaded', function() {
    // ==================== GESTION DU FORMULAIRE ====================
    const registrationForm = document.getElementById('registrationForm');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Désactiver le bouton pendant le traitement
            const submitBtn = registrationForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

            // Validation améliorée
            let isValid = true;
            const errorMessages = [];
            const requiredFields = registrationForm.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                field.style.borderColor = '#E0E0E0'; // Reset
                
                if (!field.value.trim()) {
                    field.style.borderColor = 'red';
                    isValid = false;
                    errorMessages.push(`Le champ "${field.labels[0].textContent.replace('*', '').trim()}" est requis`);
                }
            });

            // Validation spécifique des champs
            const emailField = document.getElementById('parentEmail');
            if (emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
                emailField.style.borderColor = 'red';
                isValid = false;
                errorMessages.push('Veuillez entrer un email valide');
            }
            const ageField = document.getElementById('childAge');
            if (ageField && (ageField.value < 3 || ageField.value > 12)) {
            ageField.style.borderColor = 'red';
            isValid = false;
            errorMessages.push('L\'âge doit être entre 3 et 12 ans');
            }
            if (!isValid) {
                showFeedback('error', errorMessages.join('<br>'));
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                return;
            }

            // Envoi réel au serveur Formspree
            try {
                const formData = new FormData(registrationForm);
                
                // Ajout d'un token anti-spam
                formData.append('_gotcha', '');
                
                const response = await fetch(registrationForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    showFeedback('success', 'Merci ! Votre inscription a bien été envoyée.<br>Nous vous contacterons dans les 48h.');
                    registrationForm.reset();
                    
                    // Sauvegarde locale des données
                    saveFormDataLocally(formData);
                    
                    // Redirection douce après 3s
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 3000);
                } else {
                    throw new Error('Erreur serveur');
                }
            } catch (error) {
                console.error('Erreur:', error);
                showFeedback('error', 'Une erreur est survenue. Veuillez réessayer ou nous contacter directement.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });

        // ==================== FONCTIONS UTILITAIRES ====================
        function showFeedback(type, message) {
            const feedbackDiv = document.createElement('div');
            feedbackDiv.className = `feedback-${type}`;
            feedbackDiv.innerHTML = `
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                ${message}
            `;
            
            const existingFeedback = document.querySelector('.feedback');
            if (existingFeedback) {
                existingFeedback.replaceWith(feedbackDiv);
            } else {
                registrationForm.appendChild(feedbackDiv);
            }
            
            setTimeout(() => {
                feedbackDiv.classList.add('show');
            }, 10);
            
            // Disparaît après 5s
            if (type === 'success') {
                setTimeout(() => {
                    feedbackDiv.classList.remove('show');
                    setTimeout(() => feedbackDiv.remove(), 300);
                }, 5000);
            }
        }

        function saveFormDataLocally(formData) {
            const formEntries = {};
            for (let [key, value] of formData.entries()) {
                formEntries[key] = value;
            }
            localStorage.setItem('lastFormSubmission', JSON.stringify(formEntries));
        }
    }
    document.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach(checkbox => {
        // Crée l'élément visuel
        const customCheckbox = document.createElement('span');
        customCheckbox.className = 'checkbox-custom';
        
        // Insère après la checkbox
        checkbox.parentNode.insertBefore(customCheckbox, checkbox.nextSibling);
        
        // Gestion des événements
        checkbox.addEventListener('change', () => {
          customCheckbox.classList.toggle('checked', checkbox.checked);
        });
        
        // Validation
        if (checkbox.required) {
          checkbox.addEventListener('invalid', () => {
            customCheckbox.style.animation = 'shake 0.3s';
            setTimeout(() => customCheckbox.style.animation = '', 300);
          });
        }
      });

});