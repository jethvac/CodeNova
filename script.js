// Loading Page Fade Out
window.addEventListener('load', () => {
    const loadingPage = document.getElementById('loading-page');
    if (loadingPage) {
        // Set a minimum display time to ensure the animation is visible
        setTimeout(() => {
            loadingPage.classList.add('fade-out');
        }, 2500); // Wait 2.5 seconds before fading out
    }
});

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu if open
        document.querySelector('.nav-menu').classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 10, 26, 0.95)';
    } else {
        navbar.style.background = 'rgba(26, 22, 37, 0.95)';
    }
});

// Create floating particles
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Contact Form Handler (Simulated Backend)
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const formObject = Object.fromEntries(formData);
    
    // Show loading
    const loading = document.querySelector('.loading');
    const result = document.getElementById('formResult');
    const submitBtn = this.querySelector('button[type="submit"]');
    
    loading.style.display = 'block';
    result.innerHTML = '';
    submitBtn.disabled = true;
    
    // Simulate API call
    try {
        await simulateAPICall(formObject);
        
        // Success
        result.innerHTML = '<span style="color: #10B981;">✓ Message sent successfully! We\'ll get back to you soon.</span>';
        this.reset();
        
        // Store contact in localStorage (simulated database)
        const contacts = JSON.parse(localStorage.getItem('codenova_contacts') || '[]');
        contacts.push({
            ...formObject,
            timestamp: new Date().toISOString(),
            id: Date.now()
        });
        localStorage.setItem('codenova_contacts', JSON.stringify(contacts));
        
    } catch (error) {
        result.innerHTML = '<span style="color: #EF4444;">✗ Failed to send message. Please try again.</span>';
    } finally {
        loading.style.display = 'none';
        submitBtn.disabled = false;
    }
});

// Simulated API call
function simulateAPICall(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate success (90% success rate)
            if (Math.random() > 0.1) {
                resolve(data);
            } else {
                reject(new Error('Network error'));
            }
        }, 2000);
    });
}

// Simple Analytics (Page View Tracking)
function trackPageView() {
    const visits = JSON.parse(localStorage.getItem('codenova_analytics') || '[]');
    visits.push({
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        page: window.location.pathname
    });
    localStorage.setItem('codenova_analytics', JSON.stringify(visits));
}

// Simple Admin Panel (accessible via console)
window.CodeNovaAdmin = {
    getContacts: () => JSON.parse(localStorage.getItem('codenova_contacts') || '[]'),
    getAnalytics: () => JSON.parse(localStorage.getItem('codenova_analytics') || '[]'),
    clearData: () => {
        localStorage.removeItem('codenova_contacts');
        localStorage.removeItem('codenova_analytics');
        console.log('Data cleared successfully');
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    trackPageView();
    
    // Console message for developers
    console.log('%cCodeNova Technologies', 'color: #8B5CF6; font-size: 24px; font-weight: bold;');
    console.log('%cWelcome to our website! Use CodeNovaAdmin object to access admin functions.', 'color: #A855F7; font-size: 14px;');
});

// Service Cards Hover Effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});