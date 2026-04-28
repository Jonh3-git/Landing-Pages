// Smooth scroll function com animação melhorada
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (!element) return;
    
    element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
    
    // Animar o elemento com destaque
    setTimeout(() => {
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = 'highlightSection 0.8s ease-out';
        }, 10);
    }, 300);
}

// WhatsApp com mensagem personalizada por sede
function openWhatsApp(sede = '') {
    let message = "Olá! Gostaria de saber mais sobre os planos da Power Gym! 💪";
    
    if (sede === 'sede1') {
        message = "Olá! Quero informações sobre a UNIDADE 1 (Trindade Central)! 📍";
    } else if (sede === 'sede2') {
        message = "Olá! Quero informações sobre a UNIDADE 2 (Jardim Primavera)! 🆕📍";
    }
    
    window.open(`https://wa.me/556294079879?text=${encodeURIComponent(message)}`, '_blank');
}

// Navbar scroll effect com destaque de link ativo
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 1)';
    }
    
    // Destacar link ativo conforme rolagem
    let current = '';
    document.querySelectorAll('section[id]').forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Observe reveal elements
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // Button animations
    document.querySelectorAll('.cta-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Card hover effects
    document.querySelectorAll('.produto, .horario-card, .beneficio-card, .sede-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Export functions globally
window.scrollToSection = scrollToSection;
window.openWhatsApp = openWhatsApp;
