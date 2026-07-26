/* ============================================
   CV Website - JavaScript
   Smooth animations & interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ---- Loading Screen ----
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            // Trigger entrance animations after loader hides
            setTimeout(initAnimations, 300);
        }, 600);
    });

    // Fallback: hide loader after 3s max
    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(initAnimations, 300);
    }, 3000);

    // ---- Intersection Observer for scroll animations ----
    function initAnimations() {
        const animateItems = document.querySelectorAll('.animate-item');

        // For items already in viewport on load, show immediately with stagger
        const sidebarItems = document.querySelectorAll('.sidebar .animate-item');
        sidebarItems.forEach((item) => {
            item.classList.add('visible');
        });

        // For main content items, use IntersectionObserver
        const mainItems = document.querySelectorAll('.main-content .animate-item');

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -40px 0px'
            });

            mainItems.forEach((item, index) => {
                item.style.transitionDelay = `${index * 0.12}s`;
                observer.observe(item);
            });
        } else {
            // Fallback for older browsers
            animateItems.forEach(item => item.classList.add('visible'));
        }
    }

    // ---- Scroll to Top Button ----
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---- Mobile Navigation ----
    const mobileNavBtns = document.querySelectorAll('.mobile-nav-btn');

    mobileNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const sectionId = btn.getAttribute('data-section');

            // Update active state
            mobileNavBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Scroll to section
            let target;
            if (sectionId === 'sidebar') {
                target = document.getElementById('sidebar');
            } else {
                target = document.getElementById(sectionId);
            }

            if (target) {
                const offset = sectionId === 'sidebar' ? 0 : -10;
                const y = target.getBoundingClientRect().top + window.pageYOffset + offset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });

    // Update mobile nav active state on scroll
    const sections = ['sidebar', 'objective', 'experience', 'projects'];

    function updateMobileNav() {
        const scrollPos = window.scrollY + 200;

        for (let i = sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(sections[i]);
            if (section && section.offsetTop <= scrollPos) {
                mobileNavBtns.forEach(btn => {
                    btn.classList.toggle('active', btn.getAttribute('data-section') === sections[i]);
                });
                break;
            }
        }
    }

    window.addEventListener('scroll', updateMobileNav, { passive: true });

    // ---- Contact items subtle animation ----
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // ---- Parallax effect on avatar ----
    const avatarRing = document.querySelector('.avatar-ring');
    if (avatarRing && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const translateY = scrollY * 0.08;
            const scale = 1 - scrollY * 0.0003;
            if (scale > 0.85) {
                avatarRing.style.transform = `translateY(${translateY}px) scale(${scale})`;
            }
        }, { passive: true });
    }
});
