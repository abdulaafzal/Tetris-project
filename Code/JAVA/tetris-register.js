function registerUser() {
// Get user input values from the form fields
const username = document.getElementById("newUsername").value.trim();
const phone = document.getElementById("newPhonenumber").value.trim();
const email = document.getElementById("newEmail").value.trim();
const password = document.getElementById("newPassword").value;
const result = document.getElementById("register-result");

// Validate: Check if all fields are filled
if (!username || !password || !phone || !email) {
result.style.color = "red";
result.innerHTML = "Please fill in all fields.";
return;
}

//Email validation
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailPattern.test(email)) {
result.style.color = "red";
result.innerHTML = "Please enter a valid email address.";
return;
}

//Phone number validation (10–15 digits)
const phonePattern = /^\d{10,15}$/;
if (!phonePattern.test(phone)) {
result.style.color = "red";
result.innerHTML = "Please enter a valid phone number (10–15 digits).";
return;
}

//Strong password validation. Must contain at least: 8+ characters, uppercase, lowercase, number, special char
const passwordPattern =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
if (!passwordPattern.test(password)) {
result.style.color = "red";
result.innerHTML =
"Password must be at least 8 characters long, include an uppercase and lowercase letter, a number, and a special character.";
return;
}

// Check if the username already exists in localStorage
if (localStorage.getItem(username)) {
result.style.color = "orange";
result.innerHTML = "Username already exists. Please choose another.";
return;
}

// Create an object to hold the new user's data
const userData = {
username: username,
phone: phone,
email: email,
password: password,
score: 0
};

// Save the new user's data to localStorage
localStorage.setItem(username, JSON.stringify(userData));

// Show a success message
result.style.color = "lightgreen";
result.innerHTML = "Registration successful! Redirecting to login...";

setTimeout(() => {
window.location.href = "tetris-login.html";
}, 1500);
}