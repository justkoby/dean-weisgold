// Dean Weisgold Law Firm - Main Script

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.site-header');
    const heroContent = document.querySelector('.hero-content');
    
    // Add scroll effect to header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '5px 0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.padding = '0';
            header.style.backgroundColor = '#fff';
        }
    });

    // Simple fade-in animation for hero content
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'all 1s ease-out';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 200);
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // Dropdown handling (simple for now)
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // FAQ Accordion
    const faqTriggers = document.querySelectorAll('.faq-trigger');
    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const item = trigger.parentElement;
            item.classList.toggle('active');
        });
    });

    // Sticky Mobile Bar Logic
    const stickyBar = document.querySelector('.sticky-mobile-bar');
    if (stickyBar) {
        window.addEventListener('scroll', () => {
            if (window.innerWidth <= 768) {
                if (window.scrollY > 300) {
                    stickyBar.classList.add('visible');
                } else {
                    stickyBar.classList.remove('visible');
                }
            }
        });
    }

    // Footer Accordions for Mobile
    const footerTriggers = document.querySelectorAll('.footer-accordion-trigger');
    footerTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const parent = trigger.parentElement;
            parent.classList.toggle('active');
        });
    });

    // Smart Intake Form Logic
    const intakeForm = document.querySelector('.intake-form');
    if (intakeForm) {
        const steps = Array.from(document.querySelectorAll('.intake-step'));
        const nextBtns = document.querySelectorAll('.next-step');
        const prevBtns = document.querySelectorAll('.prev-step');
        const dots = document.querySelectorAll('.step-dot');
        const progressBarFill = document.querySelector('.progress-bar-fill');
        let currentStep = 0;

        const updateForm = () => {
            steps.forEach((step, idx) => {
                step.classList.toggle('active', idx === currentStep);
            });
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentStep);
                dot.classList.toggle('completed', idx < currentStep);
            });
            const progress = (currentStep / (steps.length - 1)) * 100;
            progressBarFill.style.width = `${progress}%`;
            window.scrollTo({ top: intakeForm.offsetTop - 100, behavior: 'smooth' });
        };

        nextBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (currentStep < steps.length - 1) {
                    currentStep++;
                    updateForm();
                }
            });
        });

        prevBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (currentStep > 0) {
                    currentStep--;
                    updateForm();
                }
            });
        });
    }

    // GSAP Animations
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Reveal
        gsap.from('.hero-content > *', {
            y: 30,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.5
        });

        // Staggered Cards Reveal (Improved for Mobile)
        const staggeredGrids = ['.practice-grid', '.highlights-grid', '.news-grid', '.faq-list', '.about-content-grid'];
        staggeredGrids.forEach(selector => {
            const grid = document.querySelector(selector);
            if (grid) {
                gsap.from(grid.children, {
                    scrollTrigger: {
                        trigger: grid,
                        start: "top 90%", // Trigger earlier on mobile
                        once: true // Ensure they don't hide again
                    },
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out"
                });
            }
        });
        
        // Refresh ScrollTrigger after a short delay to ensure layout is final
        window.addEventListener('load', () => {
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 500);
        });
    }

    // Update Copyright Year
    const copyrightYear = document.querySelector('.footer-bottom p');
    if (copyrightYear) {
        copyrightYear.innerHTML = copyrightYear.innerHTML.replace('2024', '2026');
    }


    console.log('Dean Weisgold Law Firm site initialized.');
});




