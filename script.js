// ==========================================
// DARK MODE TOGGLE
// ==========================================
const themeBtn = document.getElementById('theme-btn');
const htmlElement = document.documentElement;
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
}

function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

themeBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
});

// Initialize on page load
initTheme();

// ==========================================
// ANIMATED TYPING TEXT
// ==========================================
const typingTexts = [
    'Prompt Engineer',
    'AI/ML Explorer',
    'Backend Builder'
];

let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-text');
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeText() {
    const fullText = typingTexts[currentTextIndex];
    
    if (!isDeleting && currentCharIndex < fullText.length) {
        // Typing
        typingElement.textContent += fullText.charAt(currentCharIndex);
        currentCharIndex++;
        setTimeout(typeText, typingSpeed);
    } else if (!isDeleting && currentCharIndex === fullText.length) {
        // Pause before deleting
        isDeleting = true;
        setTimeout(typeText, pauseTime);
    } else if (isDeleting && currentCharIndex > 0) {
        // Deleting
        typingElement.textContent = fullText.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        setTimeout(typeText, deletingSpeed);
    } else if (isDeleting && currentCharIndex === 0) {
        // Move to next text
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
        setTimeout(typeText, 500);
    }
}

// Start typing animation
if (typingElement) {
    typeText();
}

// ==========================================
// SCROLL-IN ANIMATIONS
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('scroll-in');
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    const certCards = document.querySelectorAll('.cert-card');
    const skillCards = document.querySelectorAll('.skill-category');
    const statsCards = document.querySelectorAll('.stat-card');
    const educationCard = document.querySelectorAll('.education-card, .contact-card');

    [...projectCards, ...certCards, ...skillCards, ...statsCards, ...educationCard].forEach(card => {
        observer.observe(card);
    });

    // Animate skill bars when in view
    const skillProgress = document.querySelectorAll('.skill-progress');
    skillProgress.forEach(bar => {
        const skillCategory = bar.closest('.skill-category');
        if (skillCategory) {
            const observer2 = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const width = entry.target.style.width;
                        entry.target.style.animation = `loadingBar 1.5s ease-out forwards`;
                        observer2.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            observer2.observe(bar);
        }
    });
});

// ==========================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ==========================================
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

function updateActiveNavLink() {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ==========================================
// SMOOTH SCROLLING FOR NAVIGATION
// ==========================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const offset = 80; // Height of navbar
            const targetPosition = targetSection.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// SMOOTH SCROLLING FOR CTA BUTTONS
// ==========================================
const ctaButtons = document.querySelectorAll('.hero-buttons a');
ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = button.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const offset = 80;
            const targetPosition = targetSection.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// PARALAX EFFECT ON SCROLL
// ==========================================
const heroSection = document.querySelector('.hero');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
            heroSection.style.backgroundPosition = `0 ${scrollY * 0.5}px`;
        }
    });
}

// ==========================================
// SMOOTH SCROLL ENHANCEMENT
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const offset = 80;
            const target = document.querySelector(href);
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// ACCESSIBILITY & KEYBOARD SUPPORT
// ==========================================
document.addEventListener('keydown', (e) => {
    // Quick navigation with arrow keys (optional)
    if (e.key === 'Escape') {
        // Close any modals if needed
    }
});

// ==========================================
// PAGE LOAD ANIMATIONS
// ==========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

console.log('🚀 Portfolio loaded successfully!');
console.log('✨ Welcome to Harini Anandan\'s portfolio');

// ==========================================
// INTERSECTION OBSERVER FOR PARALLAX TEXT
// ==========================================
const textElements = document.querySelectorAll('h2, h3, p');
const parallaxObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        }
    });
}, { threshold: 0.1 });

textElements.forEach(el => {
    parallaxObserver.observe(el);
});

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        updateActiveNavLink();
    }, 10);
}, { passive: true });
