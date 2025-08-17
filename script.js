// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Smooth Scrolling Function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const navHeight = document.getElementById('navbar').offsetHeight;
        const elementPosition = element.offsetTop - navHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
    
    // Close mobile menu if open
    mobileMenuBtn.classList.remove('active');
    navMenu.classList.remove('active');
}

// Navigation Link Active State
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach((link) => {
                link.classList.remove('active');
            });
            
            const activeLink = document.querySelector(`[data-target="${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
    
    // Special case for home (top of page)
    if (window.scrollY < 100) {
        navLinks.forEach((link) => {
            link.classList.remove('active');
        });
        const homeLink = document.querySelector('[data-target="home"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }
}

// Add click event listeners to navigation links
navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-target');
        scrollToSection(targetId);
    });
});

// Navbar Background on Scroll
const navbar = document.getElementById('navbar');

function updateNavbarBackground() {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 1)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
}

// Scroll Event Listeners
window.addEventListener('scroll', () => {
    updateActiveNavLink();
    updateNavbarBackground();
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavLink();
    updateNavbarBackground();
});

// Animation on Scroll (Simple fade-in effect)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll('.step-card, .stat-card, .company-card, .story-card');

animatedElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Close mobile menu when window is resized to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 767) {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Smooth hover effects for buttons
const buttons = document.querySelectorAll('.btn');

buttons.forEach((button) => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
    });
});

// Add click ripple effect to buttons
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS animation for ripple effect
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Statistics counter animation
const statValues = document.querySelectorAll('.stat-value');

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target.toString().includes('+')) {
            element.textContent = Math.floor(current) + '+';
        } else if (target.toString().includes('hrs')) {
            element.textContent = Math.floor(current) + 'hrs';
        } else if (target.toString().includes('%')) {
            element.textContent = Math.floor(current) + '%';
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Observe stats for counter animation
// const statsObserver = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//             const element = entry.target;
//             const text = element.textContent;
//             const value = parseInt(text.replace(/\D/g, ''));
            
//             animateCounter(element, value);
//             statsObserver.unobserve(element);
//         }
//     });
// }, { threshold: 0.5 });

// statValues.forEach((stat) => {
//     statsObserver.observe(stat);
// });

// Form submission handling (if contact form is added later)
function handleFormSubmission(formData) {
    // This would handle form submission to a backend service
    console.log('Form submitted:', formData);
}

// Lazy loading for images
const images = document.querySelectorAll('img');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '1';
            imageObserver.unobserve(img);
        }
    });
});

images.forEach((img) => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
    img.onload = () => {
        img.style.opacity = '1';
    };
    imageObserver.observe(img);
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Replace scroll event listeners with throttled versions
window.removeEventListener('scroll', updateActiveNavLink);
window.removeEventListener('scroll', updateNavbarBackground);

window.addEventListener('scroll', throttle(() => {
    updateActiveNavLink();
    updateNavbarBackground();
}, 10));

// Add smooth page transitions
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Console log for debugging
console.log('Indori Job Factory website loaded successfully!');