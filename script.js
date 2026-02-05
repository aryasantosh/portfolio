// ===== Initialize AOS (Animate On Scroll) =====
AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true,
    offset: 100
});

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Mobile Navigation =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section');
const navLinksAll = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== Typing Animation for Hero =====
const dynamicText = document.querySelector('.dynamic-text');
const words = ['iOS Developer', 'Swift Enthusiast', 'Mobile App Developer', 'AI/ML Learner', 'Problem Solver'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        dynamicText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        dynamicText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}

typeEffect();

// ===== Typing Animation for Navbar Role =====
const navRole = document.getElementById('navRole');
const navRoles = ['iOS Developer', 'Swift Developer', 'Mobile Developer', 'AI/ML Learner'];
let navWordIndex = 0;
let navCharIndex = 0;
let navIsDeleting = false;

function navTypeEffect() {
    const currentWord = navRoles[navWordIndex];
    
    if (navIsDeleting) {
        navRole.textContent = currentWord.substring(0, navCharIndex - 1);
        navCharIndex--;
    } else {
        navRole.textContent = currentWord.substring(0, navCharIndex + 1);
        navCharIndex++;
    }
    
    if (!navIsDeleting && navCharIndex === currentWord.length) {
        navIsDeleting = true;
        setTimeout(navTypeEffect, 2500);
    } else if (navIsDeleting && navCharIndex === 0) {
        navIsDeleting = false;
        navWordIndex = (navWordIndex + 1) % navRoles.length;
        setTimeout(navTypeEffect, 300);
    } else {
        setTimeout(navTypeEffect, navIsDeleting ? 40 : 80);
    }
}

navTypeEffect();

// ===== Experience Timeline Scroll Animation =====
const timelineBlocks = document.querySelectorAll('.timeline-block');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

timelineBlocks.forEach(block => {
    timelineObserver.observe(block);
});

// ===== Counter Animation =====
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (el) => {
    const target = parseFloat(el.getAttribute('data-target'));
    const isDecimal = target % 1 !== 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            el.textContent = isDecimal ? current.toFixed(2) : Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            el.textContent = isDecimal ? target.toFixed(2) : target;
        }
    };
    
    updateCounter();
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(num => counterObserver.observe(num));

// ===== Skill Progress Animation =====
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.getAttribute('data-progress');
            entry.target.style.width = progress + '%';
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Scroll Progress Indicator =====
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
};

createScrollProgress();

// ===== Resume Modal =====
const resumeBtn = document.getElementById('resumeBtn');
const resumeModal = document.getElementById('resumeModal');
const resumeClose = document.getElementById('resumeClose');

if (resumeBtn && resumeModal) {
    resumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        resumeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    resumeClose.addEventListener('click', () => {
        resumeModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    resumeModal.addEventListener('click', (e) => {
        if (e.target === resumeModal) {
            resumeModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
            resumeModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ===== Project Card Hover Effect =====
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// ===== Console Easter Egg =====
console.log('%c👋 Hey there!', 'font-size: 20px; font-weight: bold; color: #8b5cf6;');
console.log('%cLooking for the source code? Feel free to reach out!', 'font-size: 14px; color: #f472b6;');
console.log('%c📧 aryakulkarni33@gmail.com', 'font-size: 12px; color: #6b7280;');

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});



// ===== Certificate Lightbox =====
const certLightbox = document.getElementById('certLightbox');
const certLightboxImg = document.getElementById('certLightboxImg');
const certLightboxCaption = document.getElementById('certLightboxCaption');
const certLightboxClose = document.getElementById('certLightboxClose');
const certLightboxOverlay = document.querySelector('.cert-lightbox-overlay');
const certLightboxPrev = document.getElementById('certLightboxPrev');
const certLightboxNext = document.getElementById('certLightboxNext');
const certLightboxDots = document.getElementById('certLightboxDots');

let currentImages = [];
let currentTitles = [];
let currentIndex = 0;

// Update lightbox display
function updateLightboxDisplay() {
    if (currentImages.length > 0) {
        certLightboxImg.src = currentImages[currentIndex];
        certLightboxCaption.textContent = currentTitles[currentIndex] || '';
        
        // Update dots
        document.querySelectorAll('.cert-lightbox-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
}

// Create dots for multi-image
function createDots(count) {
    certLightboxDots.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const dot = document.createElement('span');
        dot.className = 'cert-lightbox-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => {
            currentIndex = i;
            updateLightboxDisplay();
        });
        certLightboxDots.appendChild(dot);
    }
}

// Open lightbox when clicking on cert-clickable cards
document.querySelectorAll('.cert-clickable').forEach(card => {
    card.addEventListener('click', () => {
        const isMulti = card.classList.contains('cert-multi');
        
        if (isMulti) {
            // Multiple images
            const imgs = card.getAttribute('data-cert-imgs');
            const titles = card.getAttribute('data-cert-titles');
            currentImages = imgs ? imgs.split(',') : [];
            currentTitles = titles ? titles.split(',') : [];
            currentIndex = 0;
            certLightbox.classList.add('has-multi');
            createDots(currentImages.length);
        } else {
            // Single image
            const imgSrc = card.getAttribute('data-cert-img');
            const title = card.getAttribute('data-cert-title');
            currentImages = imgSrc ? [imgSrc] : [];
            currentTitles = title ? [title] : [];
            currentIndex = 0;
            certLightbox.classList.remove('has-multi');
        }
        
        if (currentImages.length > 0 && certLightbox) {
            updateLightboxDisplay();
            certLightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Navigation
if (certLightboxPrev) {
    certLightboxPrev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        updateLightboxDisplay();
    });
}

if (certLightboxNext) {
    certLightboxNext.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % currentImages.length;
        updateLightboxDisplay();
    });
}

// Close lightbox functions
function closeCertLightbox() {
    if (certLightbox) {
        certLightbox.classList.remove('active');
        certLightbox.classList.remove('has-multi');
        document.body.style.overflow = '';
        currentImages = [];
        currentTitles = [];
        currentIndex = 0;
    }
}

// Close on X button click
if (certLightboxClose) {
    certLightboxClose.addEventListener('click', closeCertLightbox);
}

// Close on overlay click
if (certLightboxOverlay) {
    certLightboxOverlay.addEventListener('click', closeCertLightbox);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (certLightbox && certLightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeCertLightbox();
        } else if (e.key === 'ArrowLeft' && currentImages.length > 1) {
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
            updateLightboxDisplay();
        } else if (e.key === 'ArrowRight' && currentImages.length > 1) {
            currentIndex = (currentIndex + 1) % currentImages.length;
            updateLightboxDisplay();
        }
    }
});

// Touch swipe support
let touchStartX = 0;
let touchEndX = 0;

if (certLightbox) {
    certLightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    certLightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50 && currentImages.length > 1) {
            if (diff > 0) {
                // Swipe left - next
                currentIndex = (currentIndex + 1) % currentImages.length;
            } else {
                // Swipe right - prev
                currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
            }
            updateLightboxDisplay();
        }
    }, { passive: true });
}
