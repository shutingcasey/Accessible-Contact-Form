document.addEventListener("DOMContentLoaded", function () {
    
    let form = document.getElementById("contactForm");
    let nameInput = document.getElementById("name");
    let emailInput = document.getElementById("email");
    let messageInput = document.getElementById("message");
    let errorMsg = document.getElementById("errorMsg");

    
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Stop form from submitting

        let name = nameInput.value.trim();
        let email = emailInput.value.trim();
        let message = messageInput.value.trim();

        errorMsg.textContent = "";

        if (name === "" || email === "" || message === "") {
            errorMsg.textContent = "All fields are required";
            return;
        }

        if (!validateEmail(email)) {
            errorMsg.textContent = "Please enter a valid email address";
            return;
        }

        alert("Form submitted successfully!");
    });

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});
