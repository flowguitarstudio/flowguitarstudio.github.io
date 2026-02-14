document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-scroll');
    fadeElements.forEach(el => observer.observe(el));

    // Logo color change observer
    const logo = document.querySelector('.fixed-logo');
    const sections = document.querySelectorAll('header, section'); // select all sections including header

    const logoObserverOptions = {
        root: null,
        rootMargin: '-5% 0px -95% 0px', // Detect intersection at the top of the viewport
        threshold: 0
    };

    const logoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                // Profile (#profile) and Contact (#contact) sections have light backgrounds, so use dark logo
                if (id === 'profile' || id === 'contact') {
                    logo.classList.add('dark');
                } else {
                    // Home (#home) and Studio (#studio) have dark backgrounds, so use light logo
                    logo.classList.remove('dark');
                }
            }
        });
    }, logoObserverOptions);

    sections.forEach(section => {
        logoObserver.observe(section);
    });
});
