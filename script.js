 document.addEventListener('DOMContentLoaded', function() {

            // ----- TYPING EFFECT -----
            const roles = [
                'Full Stack Developer',
                'AI/ML Enthusiast',
                'Intern at Capsitech',
                'BCA Student',
                'Problem Solver'
            ];
            let roleIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            const typingElement = document.getElementById('typingText');

            function typeEffect() {
                const currentRole = roles[roleIndex];
                if (isDeleting) {
                    typingElement.textContent = currentRole.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    typingElement.textContent = currentRole.substring(0, charIndex + 1);
                    charIndex++;
                }

                let speed = isDeleting ? 50 : 100;

                if (!isDeleting && charIndex === currentRole.length) {
                    speed = 1800;
                    isDeleting = true;
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    speed = 400;
                }
                setTimeout(typeEffect, speed);
            }
            typeEffect();

            // ----- MOBILE NAV -----
            const mobileToggle = document.getElementById('mobileToggle');
            const mobileNav = document.getElementById('mobileNav');
            const closeMobileBtn = document.getElementById('closeMobileNav');

            mobileToggle.addEventListener('click', () => {
                mobileNav.classList.toggle('open');
                document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
            });

            closeMobileBtn.addEventListener('click', () => {
                mobileNav.classList.remove('open');
                document.body.style.overflow = '';
            });

            window.closeMobile = function() {
                mobileNav.classList.remove('open');
                document.body.style.overflow = '';
            };

            // Close on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
                    mobileNav.classList.remove('open');
                    document.body.style.overflow = '';
                }
            });

            // ----- ACTIVE NAV LINK ON SCROLL -----
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');

            function updateActiveLink() {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 150;
                    if (window.scrollY >= sectionTop) {
                        current = section.getAttribute('id');
                    }
                });
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            }
            window.addEventListener('scroll', updateActiveLink);
            updateActiveLink();

            // ----- CONTACT FORM (Netlify) -----
            const contactForm = document.getElementById('contactForm');
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toastMessage');

            function showToast(message, type = 'success') {
                toastMessage.textContent = message;
                toast.className = `toast ${type}`;
                toast.querySelector('i').className = type === 'success' ?
                    'fas fa-check-circle text-lg' :
                    'fas fa-exclamation-circle text-lg';
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 5000);
            }

            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();

                const name = document.getElementById('formName').value.trim();
                const email = document.getElementById('formEmail').value.trim();
                const phone = document.getElementById('formPhone').value.trim();
                const message = document.getElementById('formMessage').value.trim();

                if (!name || !email || !message) {
                    showToast('Please fill in all required fields.', 'error');
                    return;
                }

                // Build form data as URL-encoded (Netlify expects this format)
                const formData = new FormData(contactForm);
                // Add the phone field if it was left empty – we keep it as is

                fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(formData).toString()
                })
                .then(response => {
                    if (response.ok) {
                        showToast('✅ Message sent successfully! I\'ll get back to you soon.', 'success');
                        contactForm.reset();
                    } else {
                        showToast('❌ Something went wrong. Please try again.', 'error');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    showToast('❌ Network error. Please check your connection.', 'error');
                });

                // Optional: you can also trigger an SMS notification if you want
                // const smsLink = `sms:+919352800190?body=${encodeURIComponent(`Portfolio message from ${name}: ${message}`)}`;
                // window.open(smsLink, '_blank');

                console.log('📨 Contact Form Submitted via Netlify');
                console.log('Name:', name);
                console.log('Email:', email);
                console.log('Phone:', phone);
                console.log('Message:', message);
            });

            // ----- SMOOTH SCROLL for all anchor links -----
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href === '#') return;
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            });

            // ----- INTERSECTION OBSERVER for glass cards animation -----
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.glass').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });

            // Also observe project cards
            document.querySelectorAll('.project-card').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });

            console.log('🚀 Jayesh Aswani Portfolio loaded successfully!');
            console.log('📧 jayeshaswani193@gmail.com');
            console.log('📞 +91 93528 00190');
        });