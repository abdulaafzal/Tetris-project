function login() {
// Get user input values from the form fields
var userName = document.getElementById('username').value.trim();
var password = document.getElementById('password').value;
var result = document.getElementById('result');

// Validate: Check if all fields are filled
if (!userName || !password) {
result.style.color = "red";
result.innerHTML = "Please enter username and password.";
return;
}

var userData = localStorage.getItem(userName);

//Checks if user exists or not
if (!userData) {
result.style.color = "red";
result.innerHTML = "User does not exist.";
return;
}

userData = JSON.parse(userData);

// Show a success message and take the user to the game
if (userData.password === password) {
result.style.color = "lightgreen";
result.innerHTML = "Login successful! Welcome " + userName;

sessionStorage.setItem("currentUser", userName);

setTimeout(() => {
window.location.href = "tetris-game.html";
}, 1000);
} else {
result.style.color = "red";
result.innerHTML = "Incorrect password.";
}
}