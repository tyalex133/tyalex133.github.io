// Toggle navigation menu
document.addEventListener("DOMContentLoaded", function () {
    // Navigation menu toggle
    let menuToggle = document.createElement("button");
    menuToggle.innerText = "☰ Menu";
    menuToggle.style.display = "none"; // Hidden by default
    document.querySelector("header").prepend(menuToggle);

    let nav = document.querySelector("nav");
    menuToggle.addEventListener("click", function () {
        nav.style.display = nav.style.display === "none" ? "block" : "none";
    });

    if (window.innerWidth <= 768) {
        menuToggle.style.display = "block";
        nav.style.display = "none"; // Hide menu initially
    }

    window.addEventListener("resize", function () {
        if (window.innerWidth <= 768) {
            menuToggle.style.display = "block";
            nav.style.display = "none";
        } else {
            menuToggle.style.display = "none";
            nav.style.display = "block";
        }
    });

    // Theme toggle
    let themeButton = document.getElementById("toggle-theme");
    themeButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        // Save mode preference
        let isDarkMode = document.body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", isDarkMode);
    });

    // Load previous mode preference
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
});

// Form validation
document.querySelector("form").addEventListener("submit", function (event) {
    let nameInput = document.getElementById("name").value.trim();
    let emailInput = document.getElementById("email").value.trim();
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex

    if (nameInput === "" || emailInput === "" || !emailRegex.test(emailInput)) {
        event.preventDefault(); // Stop form submission
        alert("Please fill out both name and email fields with valid information.");
    }
});