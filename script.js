document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Menu Toggle
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });

    // Close mobile menu when a link is clicked
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
        });
    });

    // 2. Scroll Fade-in Animation (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // 3. Contact Form & Success Box Logic (Web3Forms API Background Sending)
    const contactForm = document.getElementById('contact-form');
    const successBox = document.getElementById('success-box');
    const closeSuccessBtn = document.getElementById('close-success');

    if (contactForm && successBox && closeSuccessBtn) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Stop the page from reloading
            
            // Change button text to show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;
            
            // Get the values the user typed
            const email = document.getElementById('user-email').value;
            const phone = document.getElementById('user-phone').value || 'Not provided';
            const message = document.getElementById('message').value;

            // Prepare data for Web3Forms API
            const formData = new FormData();
            
            // Your Web3Forms Access Key
            formData.append("access_key", "804e957b-5e29-4b19-8641-8adae5b2bcd5"); 
            
            formData.append("subject", "New Contact from Portfolio");
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("message", message);
            formData.append("from_name", "Portfolio Website");

            try {
                // Send the request in the background
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    // Clear the form fields
                    contactForm.reset();
                    
                    // Show the custom success box overlay
                    successBox.classList.remove('opacity-0', 'pointer-events-none');
                    successBox.classList.add('opacity-100', 'pointer-events-auto');
                } else {
                    alert("Something went wrong. Please try again.");
                }
            } catch (error) {
                alert("Network error. Please check your internet connection and try again.");
            } finally {
                // Restore button state
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });

        // Handle closing the success box
        closeSuccessBtn.addEventListener('click', () => {
            successBox.classList.remove('opacity-100', 'pointer-events-auto');
            successBox.classList.add('opacity-0', 'pointer-events-none');
        });
    }
});