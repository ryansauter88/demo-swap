const loginForm = document.querySelector('.login-container form');
const registerForm = document.querySelector('.registration-container form');
// Selecting the login and registration form elements from the document.

// Asynchronous function to handle the login form submission.
const loginFormHandler = async (event: Event): Promise<void> => {
     // Prevents the default form submission behavior.
    event.preventDefault();
 
    // Selecting the email and password input elements from the login form.
    const emailInput = document.querySelector('#email-login') as HTMLInputElement;
    const passwordInput = document.querySelector('#password-login') as HTMLInputElement;


    // const email = emailInput.value.trim();
    // const password = passwordInput.value.trim();

// Checks if both email and password inputs are available.
    if (emailInput && passwordInput) {
        const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
   // Trimming the values to remove any leading/trailing whitespace

 // Checks if both email and password are not empty.
    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });


        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to log in');
        }
    }
}
};

// Adding an event listener to the login form for the submit event.
if (loginForm) {
    loginForm.addEventListener('submit', loginFormHandler);
}


const signupFormHandler = async (event: Event): Promise<void> => {
    event.preventDefault();

// Selecting the input elements from the registration form.
    const nameInput = document.querySelector('#name-signup') as HTMLInputElement;
    const emailInput = document.querySelector('#email-signup') as HTMLInputElement;
    const passwordInput = document.querySelector('#password-signup') as HTMLInputElement;
    const steamIdInput = document.querySelector('#steamId-signup') as HTMLInputElement;

 // Trimming the values to remove any leading/trailing whitespace.
    const fullName = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const steamId = steamIdInput.value.trim();


    console.log(fullName);


    if (fullName && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ fullName, email, password, steamId }),
            headers: { 'Content-Type': 'application/json' },
        });


        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

// Adding an event listener to the registration form for the submit event.
if (registerForm) {
    registerForm.addEventListener('submit', signupFormHandler);
}


document
    .querySelector('.login-form')
    ?.addEventListener('submit', loginFormHandler);


document
    .querySelector('.signup-form')
    ?.addEventListener('submit', signupFormHandler);
  