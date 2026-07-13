document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            alert('Thank you for reaching out! We will get back to you shortly.');
            contactForm.reset();
        });
    }
});
