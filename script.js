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

    // SMS link dynamic body for iOS/Android compatibility
    const smsLink = document.getElementById('sms-link');
    if (smsLink) {
        const message = "[Flow Guitar Studio] 레슨 문의드립니다.\n1. 성함: > \n2. 연령대(성인/학생): > \n3. 기타 경험: > \n4. 상담 희망 시간: > ";
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        const separator = isIOS ? '&' : '?';
        smsLink.href = `sms:010-2193-7184${separator}body=${encodeURIComponent(message)}`;
    }
});
