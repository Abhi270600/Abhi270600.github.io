// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll-triggered animations (NOT project cards)
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.education-card, .timeline-content, .skill-item, .achievement-card');
    elements.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight / 1.2) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    // Scroll animations for non-project elements
    const animatedEls = document.querySelectorAll('.education-card, .timeline-content, .skill-item, .achievement-card');
    animatedEls.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    animateOnScroll();

    // Window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => document.body.classList.remove('resize-animation-stopper'), 400);
        if (window.innerWidth > 992) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // ── Project filter ──────────────────────────────────────────────
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    function applyFilter(filter) {
        let delay = 0;
        projectCards.forEach(card => {
            const cats = (card.getAttribute('data-category') || '').split(' ');
            const show = filter === 'all' || cats.includes(filter);

            if (show) {
                card.style.display = 'flex';
                // Force reflow so transition fires
                card.getBoundingClientRect();
                card.style.opacity = '0';
                card.style.transform = 'translateY(16px)';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, delay);
                delay += 60;
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(8px)';
                setTimeout(() => { card.style.display = 'none'; }, 300);
            }
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent document click handler interfering
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFilter(btn.getAttribute('data-filter'));
        });
    });

    // Init: show all
    applyFilter('all');
});

window.addEventListener('scroll', animateOnScroll);