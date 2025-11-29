// script.js - Complete JavaScript functionality for the portfolio
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const header = document.getElementById('header');
    const themeToggle = document.getElementById('theme-toggle');
    const backToTop = document.getElementById('back-to-top');

    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Check for saved theme preference or respect OS preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        this.classList.toggle('hamburger-active');
        mobileMenu.classList.toggle('mobile-menu-active');
        document.body.classList.toggle('overflow-hidden');
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('hamburger-active');
            mobileMenu.classList.remove('mobile-menu-active');
            document.body.classList.remove('overflow-hidden');
        });
    });

    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled', 'py-2', 'shadow-lg');
            header.classList.remove('py-4');
        } else {
            header.classList.remove('scrolled', 'py-2', 'shadow-lg');
            header.classList.add('py-4');
        }

        // Show/hide back to top button
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active section highlighting
        highlightActiveSection();
    });

    // Back to top functionality
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Active section highlighting
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-secondary', 'bg-secondary/10');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('text-secondary', 'bg-secondary/10');
            }
        });
    }

    // Animate skill bars when they come into view
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');

        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            bar.style.transform = `scaleX(${parseInt(width) / 100})`;
                        }, 300);
                        observer.unobserve(bar);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(bar);
        });
    }

    // Create particles for background
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            // Random properties
            const size = Math.random() * 6 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 15;
            const duration = Math.random() * 10 + 10;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;

            particlesContainer.appendChild(particle);
        }
    }

    // Intersection Observer for animations
    const fadeElements = document.querySelectorAll('.card-hover');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If this is the tech stack section, animate skill bars
                if (entry.target.id === 'tech-stack' || entry.target.closest('#tech-stack')) {
                    animateSkillBars();
                    skillObserver.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.3 });

    // Observe elements for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-4');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
        element.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-500');
        observer.observe(element);
    });

    // Observe tech stack section for skill bars
    const techStackSection = document.getElementById('tech-stack');
    if (techStackSection) {
        skillObserver.observe(techStackSection);
        techStackSection.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-500');
        observer.observe(techStackSection);
    }

    // Form submission handling
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;

            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                alert('Thank you for your message! I will get back to you soon.');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }

    // Remove loading screen when page is fully loaded
    window.addEventListener('load', function() {
        const loading = document.getElementById('loading');
        setTimeout(() => {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }, 1000);

        // Create particles after page load
        createParticles();
    });
});