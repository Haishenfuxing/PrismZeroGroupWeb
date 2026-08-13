(function() {
    const sections = document.querySelectorAll('section');
    const dotsContainer = document.getElementById('navDots');
    const navLinks = document.querySelectorAll('.nav-link');

    // 生成右侧导航点
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

    // 导航链接点击滚动
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
            if (href === `#${sections[activeIndex]?.id}`) {
                link.classList.add('active-nav');
            }
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

    // 额外处理宣言区块高亮（因为它不是section）
    // 可以忽略，或者将宣言也作为一个观察目标
    const footerQuote = document.querySelector('.footer-quote');
    if (footerQuote) {
        observer.observe(footerQuote);
    }

    if (sections.length > 0) updateActive(0);
})();