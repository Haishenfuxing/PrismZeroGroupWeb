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
            const targetId = link.getAttribute('href'); // 例如 "#about"
            if (targetId && targetId !== '#') {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // 更新激活状态（右侧点 + 导航链接）
    function updateActiveState(activeIndex) {
        // 更新右侧点
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === activeIndex);
        });
        // 更新导航链接高亮
        navLinks.forEach((link, idx) => {
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
                updateActiveState(index);
            }
        });
    }, { threshold: 0.6 });

    sections.forEach(section => observer.observe(section));

    // 初始激活
    if (sections.length > 0) {
        updateActiveState(0);
    }
})();