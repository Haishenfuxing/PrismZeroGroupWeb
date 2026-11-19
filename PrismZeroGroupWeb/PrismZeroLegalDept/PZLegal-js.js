(function() {
    const sections = document.querySelectorAll('section');
    const dotsContainer = document.getElementById('navDots');
    const navLinks = document.querySelectorAll('.nav-link');

    dotsContainer.innerHTML = '';
    sections.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
            sections[index].scrollIntoView({ behavior: 'smooth' });
        });
        dotsContainer.appendChild(dot);
    });
    const dots = document.querySelectorAll('.dot');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetEl = document.querySelector(targetId);
                if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    function updateActive(activeIndex) {
        dots.forEach((dot, i) => dot.classList.toggle('active', i === activeIndex));
        navLinks.forEach(link => {
            link.classList.remove('active-nav');
            const href = link.getAttribute('href');
            if (href === `#${sections[activeIndex]?.id}`) link.classList.add('active-nav');
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const idx = Array.from(sections).indexOf(entry.target);
                updateActive(idx);
            }
        });
    }, { threshold: 0.6 });

    sections.forEach(s => observer.observe(s));

    const footerQuote = document.querySelector('.footer-quote');
    if (footerQuote) observer.observe(footerQuote);

    if (sections.length > 0) updateActive(0);
})();