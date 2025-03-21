'use strict'

// A. REGISTER FORM

//Gather all of the inputs inside the Register Form
const regForm = document.querySelector(".register-form");
const loginForm = document.querySelector(".login-form");

const nameInput = document.getElementById("reg-name-input");
const userNameInput = document.getElementById("reg-username-input");
const passwordInput = document.getElementById("reg-password-input");
const confirmPasswordInput = document.getElementById("reg-confirmPassword-input");



// Save all of the inputs to Local Storage if thew user clicks the "Register button"
const regBtn2 = document.getElementById("register-btn-2");
const loginBtn2 = document.getElementById("login-btn-2");


regBtn2.addEventListener("click", registerUser);


// Initialize the Local Storage Key
let localStorageKey = "userAdmin";

function registerUser(){
	
	// User Data Object
	const userData = {
		name: nameInput.value,
		username: userNameInput.value,
		password: passwordInput.value,
		isLoggedIn: false
	}

	if (!userData.name || !userData.username || !userData.password || !confirmPasswordInput.value) {
        alert("Please fill in all fields.");
        return;
    }

	if(confirmPasswordInput.value === passwordInput.value){
		localStorage.setItem(localStorageKey, JSON.stringify(userData));
		checkLocalStorageKey();
	} else{
		alert("Passwords does not match. Please try again");
	}
}

function checkLocalStorageKey(){
	if(localStorageKey in localStorage){
		regForm.style.display = "none";
		loginForm.style.display = "block";
	} else{
		loginForm.style.display = "none";
		regForm.style.display = "block";
	}
}

checkLocalStorageKey();

loginBtn2.addEventListener("click", () => {
	if(localStorageKey in localStorage){
		regForm.style.display = "none";
		loginForm.style.display = "block";
	} else{
		alert("Please register first");
	}
});



// B. LOGIN FORM
const regBtn1 = document.getElementById("register-btn-1");
const loginBtn1 = document.getElementById("login-btn-1"); 
const dashboard = document.querySelector(".dashboard"); 
	
let loginUserNameInput = document.getElementById("username-input");
let loginPasswordInput = document.getElementById("password-input");


regBtn1.addEventListener("click", () => {
	if(localStorageKey in localStorage){
		alert("You have already an existing account. Please log in");
	} else{
		loginForm.style.display = "none";
		regForm.style.display = "block";
	}
});

loginBtn1.addEventListener("click", loginUser);

function loginUser(){
	const loadLocalStorage = localStorage.getItem(localStorageKey);
	const parseLocalStorage = JSON.parse(loadLocalStorage);
	const loadUserDataPassword = parseLocalStorage.password;
	const loadUserDataUserName = parseLocalStorage.username;

	if(loginUserNameInput.value === loadUserDataUserName && loginPasswordInput.value === loadUserDataPassword){
		dashboard.style.display = "grid";
		loginForm.style.display = "none";
		
		parseLocalStorage.isLoggedIn = "true";
		localStorage.setItem(localStorageKey, JSON.stringify(parseLocalStorage));

		alert("User logged in successfully.");
	} else{
		alert("Incorrect Credentials");
	}
}


// Set the isLoggedIn boolean to true to make the user to stay Logged In after Logging in
function checkLoginStatus(){
    const loadLocalStorage = localStorage.getItem(localStorageKey);
    const parseLocalStorage = JSON.parse(loadLocalStorage);
    
    if (parseLocalStorage && parseLocalStorage.isLoggedIn) {
        dashboard.style.display = "grid";
        loginForm.style.display = "none";
        return true; // User is logged in
    } else{
		 return false;
	 }
}

// Checks the page if the user is logged in or not
checkLoginStatus();



// Log out function
const logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click", logOut);

function logOut() {
    const loadLocalStorage = localStorage.getItem(localStorageKey);
    const parseLocalStorage = JSON.parse(loadLocalStorage);
    const logoutMessage = confirm("Are you sure you want to log out?");

    if (logoutMessage) { // User clicked "OK"
        if (parseLocalStorage && parseLocalStorage.isLoggedIn) {
            // Update the isLoggedIn status
            parseLocalStorage.isLoggedIn = false;
            localStorage.setItem(localStorageKey, JSON.stringify(parseLocalStorage)); // Save back to local storage
            
            alert("User logged out successfully.");
			   location.reload();
        }
    } else {
       alert("User canceled the logout.");
    }
}



// Remove Password function
const removePasswordBtn = document.getElementById("removePW-btn");


removePasswordBtn.addEventListener("click", removeAccount);

function removeAccount(){
	const removeAccountMessage = confirm("Are you sure you want to delete your account?");

	if(removeAccountMessage){
		localStorage.removeItem(localStorageKey);
		alert("Your account has been deleted successfully");
		location.reload();
	} else{
		alert("User cancelled the account deletion");
	}
}



// Change Password
const changePasswordForm = document.querySelector(".change-form");
const confirmChangePasswordBtn = document.getElementById("change-password");
const cancelChangePasswordBtn = document.getElementById("cancel-change-password");
const changePasswordBtn = document.getElementById("changePW-btn");


changePasswordBtn.addEventListener("click", showPasswordForm);

function showPasswordForm(){
	let confirmChangePass = confirm("Are you sure you want to change your password?");

	if(confirmChangePass){
		dashboard.style.display = "none";
		changePasswordForm.style.display = "block";
	} else{
		alert("User cancelled the change password");
	}
}


cancelChangePasswordBtn.addEventListener("click", () => {
	changePasswordForm.style.display = "none";
	checkLoginStatus();
});
confirmChangePasswordBtn.addEventListener("click", changePassword);

function changePassword(){
	const oldPasswordInput = document.getElementById("old-password-input");
	const newPasswordInput = document.getElementById("new-password-input");

	// Get old Password data from the Local Storage
	const loadLocalStorage = localStorage.getItem(localStorageKey);
	const parseLocalStorage = JSON.parse(loadLocalStorage);
	let getOldPassword = parseLocalStorage.password;

	// Create new password
	if(oldPasswordInput.value === getOldPassword){
		parseLocalStorage.password = newPasswordInput.value;
		localStorage.setItem(localStorageKey, JSON.stringify(parseLocalStorage));
		alert("User successfully changed the password");
		changePasswordForm.style.display = "none";
		checkLoginStatus();
	} else{
		alert("Passwords does not match. Please try again");
	}
}


























