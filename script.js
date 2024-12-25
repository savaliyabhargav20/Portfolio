// Function to toggle mobile navigation menu
function toggleNav() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}

// Form validation and submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simple validation
    if (!name || !email || !message) {
        alert('All fields are required!');
        return;
    }

        // Function to toggle mobile navigation menu
function toggleNav() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}
    // Simulate form submission (for demo purposes)
    alert(`Thank you for your message, ${name}! We'll get back to you soon.`);

    // Clear the form fields
    document.getElementById('contact-form').reset();
})