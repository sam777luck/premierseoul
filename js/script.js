// Modal functionality
const modal = document.getElementById('consultation-modal');
const closeBtn = document.querySelector('.close');

// Function to open modal
function openModal() {
    modal.style.display = 'block';
}

// Open modal for all elements with class 'open-modal' or id 'open-modal'
document.querySelectorAll('.open-modal, #open-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
});

// Open modal when clicking Contact link
const contactLinks = document.querySelectorAll('a[href="#contact"]');
contactLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
});

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

// Close modal with ESC key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
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

// Initialize EmailJS with your public key
// You need to replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
// Sign up at https://www.emailjs.com/ to get your keys
emailjs.init('8-hrNW2py5kDLTFMZ');

if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();

        // Get error message element
        const errorMsg = document.getElementById('form-error');

        // Validation
        const errors = [];
        if (!name) errors.push('Name');
        if (!email) errors.push('Email');
        if (!service) errors.push('Service');

        if (errors.length > 0) {
            errorMsg.textContent = `Please fill in the following required fields: ${errors.join(', ')}`;
            errorMsg.classList.add('show');
            return;
        }

        // Hide error message if validation passes
        errorMsg.classList.remove('show');

        // Prepare email content
        const serviceNames = {
            'concierge': 'Concierge Onboarding',
            'general': 'General Inquiry'
        };

        // Disable submit button to prevent double submission
        const submitBtn = consultationForm.querySelector('.cta-button');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        // Email template parameters
        const templateParams = {
            to_email: 'contact@premierseoul.com',
            from_name: name,
            from_email: email,
            service: serviceNames[service],
            message: message || 'No message provided',
            subject: `New Consultation Request - ${serviceNames[service]}`
        };

        // Get success message element
        const successMsg = document.getElementById('form-success');

        // Send email using EmailJS
        // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual IDs from EmailJS
        emailjs.send('service_2lmu14c', 'template_xqfn6pb', templateParams)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);

                // Hide form and show success message
                consultationForm.style.display = 'none';
                successMsg.textContent = 'Thank you for your request! We have received your information and will contact you shortly.';
                successMsg.classList.add('show');

                // Reset and close modal after 3 seconds
                setTimeout(() => {
                    modal.style.display = 'none';
                    consultationForm.style.display = 'flex';
                    consultationForm.reset();
                    successMsg.classList.remove('show');
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 3000);
            })
            .catch((error) => {
                console.error('FAILED...', error);
                errorMsg.textContent = 'Failed to send your request. Please try again or contact us directly at contact@premierseoul.com';
                errorMsg.classList.add('show');
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            });
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
