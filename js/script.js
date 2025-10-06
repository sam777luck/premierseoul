// Modal functionality
const modal = document.getElementById('consultation-modal');
const openModalBtn = document.getElementById('open-modal');
const closeBtn = document.querySelector('.close');

if (openModalBtn) {
    openModalBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Form submission handlers
const leadForm = document.querySelector('.lead-form');
const consultationForm = document.querySelector('.consultation-form');

if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = leadForm.querySelector('input[type="email"]').value;
        alert(`Thank you! Your guide will be sent to ${email}`);
        leadForm.reset();
    });
}

if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your request! We will contact you shortly.');
        modal.style.display = 'none';
        consultationForm.reset();
    });
}

// Instant scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;

        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'auto',
                block: 'start'
            });
        }
    });
});

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

// Show button when scrolled down
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// Scroll to top when clicked
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });

        // If the clicked item wasn't active, open it
        if (!isActive) {
            item.classList.add('active');
        }
    });
});
