/**
 * main.js - She Can Foundation
 * Features:
 * 1. Counter animation (about.html)
 * 2. Volunteer form validation (contact.html)
 * 3. Donate form (donate.html)
 * 4. Footer newsletter intercept
 * 5. Reveal / pop-up text animations (home, about, donate)
 */

(function() {
    'use strict';

    function initCounters() {
        const counters = document.querySelectorAll('.counter');
        if (!counters.length) return;

        const animated = new WeakSet();

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counterEl = entry.target;
                    if (animated.has(counterEl)) return;

                    const target = parseInt(counterEl.getAttribute('data-target'), 10);
                    if (isNaN(target)) return;

                    animated.add(counterEl);
                    animateCounter(counterEl, target);
                    obs.unobserve(counterEl);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    function animateCounter(el, target) {
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - (1 - progress) * (1 - progress);
            el.textContent = Math.floor(easeOut * target);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        }

        requestAnimationFrame(update);
    }

    function initRevealAnimations() {
        const reveals = document.querySelectorAll('.reveal');
        if (!reveals.length) return;

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) {
            reveals.forEach(el => el.classList.add('is-visible'));
            return;
        }

        const showElement = (el) => {
            const delay = parseInt(el.getAttribute('data-reveal-delay') || '0', 10);
            setTimeout(() => el.classList.add('is-visible'), delay);
        };

        const loadElements = [];
        const scrollElements = [];

        reveals.forEach(el => {
            const mode = el.getAttribute('data-reveal') || 'scroll';
            if (mode === 'load') {
                loadElements.push(el);
            } else {
                scrollElements.push(el);
            }
        });

        loadElements.forEach(showElement);

        if (!scrollElements.length) return;

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    showElement(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

        scrollElements.forEach(el => {
            if (!el.classList.contains('is-visible')) {
                observer.observe(el);
            }
        });
    }

    function initVolunteerForm() {
        const form = document.getElementById('volunteerForm');
        if (!form) return;

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const fullName = document.getElementById('fullName');
            const email = document.getElementById('emailAddress');
            const interestTrack = document.getElementById('interestTrack');
            const motivation = document.getElementById('motivation');

            const nameVal = fullName?.value.trim() || '';
            const emailVal = email?.value.trim() || '';
            const interestVal = interestTrack?.value || '';
            const motivationVal = motivation?.value.trim() || '';

            let errorMsg = '';

            if (!nameVal) {
                errorMsg = 'Please enter your full name.';
            } else if (!emailVal || !/^\S+@\S+\.\S+$/.test(emailVal)) {
                errorMsg = 'Please enter a valid email address.';
            } else if (!interestVal) {
                errorMsg = 'Please select an area of interest.';
            } else if (!motivationVal) {
                errorMsg = 'Please tell us why you want to join.';
            }

            if (errorMsg) {
                alert(errorMsg);
                return;
            }

            const container = document.querySelector('.registration-container');
            if (container) {
                container.innerHTML = `
                    <div class="container">
                        <div class="success-card">
                            <h2>Thank you for stepping up to make a difference!</h2>
                            <p>The She Can Foundation team will review your application and reach out via email within 48 hours.</p>
                        </div>
                    </div>
                `;
                container.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    function initDonateForm() {
        const form = document.getElementById('donateForm');
        if (!form) return;

        const customWrap = document.getElementById('customAmountWrap');
        const customInput = document.getElementById('customAmount');
        const customRadio = document.getElementById('amountCustom');

        form.querySelectorAll('input[name="amount"]').forEach(radio => {
            radio.addEventListener('change', () => {
                if (customWrap) {
                    customWrap.hidden = radio.value !== 'custom';
                }
                if (customInput && radio.value !== 'custom') {
                    customInput.removeAttribute('required');
                } else if (customInput) {
                    customInput.setAttribute('required', 'required');
                }
            });
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = document.getElementById('donorName')?.value.trim();
            const email = document.getElementById('donorEmail')?.value.trim();
            const amountRadio = form.querySelector('input[name="amount"]:checked');

            if (!amountRadio) {
                alert('Please select a donation amount.');
                return;
            }
            if (!name) {
                alert('Please enter your full name.');
                return;
            }
            if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            if (amountRadio.value === 'custom') {
                const custom = parseInt(customInput?.value, 10);
                if (!custom || custom < 100) {
                    alert('Please enter a custom amount of at least ₹100.');
                    return;
                }
            }

            const wrapper = document.querySelector('.donate-form-wrapper');
            if (wrapper) {
                wrapper.innerHTML = `
                    <div class="success-card">
                        <h2>Thank you for your generosity!</h2>
                        <p>We have received your donation intent. Our team will contact you at <strong>${email}</strong> with payment details shortly.</p>
                        <a href="index.html" class="btn btn-primary" style="margin-top: 1.5rem;">Back to Home</a>
                    </div>
                `;
                wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    function initNewsletter() {
        const subscribeBtn = document.querySelector('.site-footer .btn-subscribe');
        if (!subscribeBtn) return;

        if (subscribeBtn.dataset.newsletterBound === 'true') return;
        subscribeBtn.dataset.newsletterBound = 'true';

        subscribeBtn.addEventListener('click', (event) => {
            event.preventDefault();

            const newsletterSection = subscribeBtn.closest('.newsletter-section');
            if (!newsletterSection) return;

            const nameInput = newsletterSection.querySelector('input[type="text"]');
            const emailInput = newsletterSection.querySelector('input[type="email"]');

            if (nameInput) nameInput.value = '';
            if (emailInput) emailInput.value = '';

            let toast = newsletterSection.querySelector('.newsletter-toast');
            if (!toast) {
                toast = document.createElement('div');
                toast.className = 'newsletter-toast';
                toast.style.cssText = `
                    background-color: var(--accent-primary);
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 2rem;
                    font-size: 0.85rem;
                    margin-top: 0.75rem;
                    display: inline-block;
                    font-weight: 500;
                    transition: opacity 0.3s ease;
                `;
                newsletterSection.appendChild(toast);
            }
            toast.textContent = 'Thank you for subscribing to our newsletter!';
            toast.style.opacity = '1';

            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => {
                    if (toast.parentNode) toast.remove();
                }, 300);
            }, 3000);
        });
    }

    function init() {
        try {
            initRevealAnimations();
            initCounters();
            initVolunteerForm();
            initDonateForm();
            initNewsletter();
        } catch (err) {
            console.warn('[SheCanFoundation] Non-critical error:', err);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
