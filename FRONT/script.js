document.addEventListener("DOMContentLoaded", function () {
    
    let form = document.getElementById("contactForm");
    let nameInput = document.getElementById("name");
    let emailInput = document.getElementById("email");
    let messageInput = document.getElementById("message");
    let errorMsg = document.getElementById("errorMsg");

    // When the user presses the "Enter" key:
    // If the focus is on an input field or button, submit the form.
    // Do NOT submit if the focus is inside a textarea, as "Enter" should insert a new line.
    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter" && document.activeElement.tagName !== "TEXTAREA") {
            event.preventDefault(); 
            form.dispatchEvent(new Event("submit"));
        }
    });

    form.addEventListener("submit", async function (event) { 
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

        let formData = {
            name: name,
            email: email,
            message: message
        };

        try {

            let response = await fetch("http://localhost:3000/api/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            let result = await response.json(); 

            if (response.ok) {
                errorMsg.textContent = "Message sent successfully!";
                errorMsg.style.color = "green";

                form.reset();
            } else {
                throw new Error(result.error || "Something went wrong");
            }
        } catch (error) {
            errorMsg.textContent = `Error: ${error.message}`;
            errorMsg.style.color = "red";
        }
    });

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});
