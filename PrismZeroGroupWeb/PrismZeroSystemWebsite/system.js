(function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    // 导航链接点击滚动
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // 更新导航高亮
    function updateActiveNav(activeIndex) {
        navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            const section = document.querySelector(href);
            if (section) {
                const sectionIndex = Array.from(sections).indexOf(section);
                link.classList.toggle('active-nav', sectionIndex === activeIndex);
            }
        });
    }

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(sections).indexOf(entry.target);
                updateActiveNav(index);
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(section => observer.observe(section));

    // 初始激活第一个
    if (sections.length > 0) {
        updateActiveNav(0);
    }
})();