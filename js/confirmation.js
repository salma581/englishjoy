document.addEventListener('DOMContentLoaded', () => {

    const data = JSON.parse(
        localStorage.getItem('lastFormSubmission')
    );

    if (!data) {
        return;
    }

    const setText = (id, value) => {
        const element = document.getElementById(id);

        if (element) {
            element.textContent = value || '-';
        }
    };

    setText(
        'parentName',
        `${data.parentFirstName || ''} ${data.parentLastName || ''}`
    );

    setText(
        'parentEmail',
        data.parentEmail
    );

    setText(
        'parentPhone',
        data.parentPhone
    );

    setText(
        'childName',
        `${data.childFirstName || ''} ${data.childLastName || ''}`
    );

    setText(
        'childAge',
        data.childAge
    );

    setText(
        'childClass',
        data.childClass
    );

    setText(
        'paymentFrequency',
        data.payment_frequency === 'annuel'
            ? 'Paiement annuel'
            : 'Paiement semestriel'
    );

    setText(
        'comments',
        data.comments || 'Aucune remarque'
    );
});