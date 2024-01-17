const loginForm = document.querySelector('.login-container form');
const registerForm = document.querySelector('.registration-container form');


const loginFormHandler = async (event: Event): Promise<void> => {
    event.preventDefault();
 
    const emailInput = document.querySelector('#email-login') as HTMLInputElement;
    const passwordInput = document.querySelector('#password-login') as HTMLInputElement;


    // const email = emailInput.value.trim();
    // const password = passwordInput.value.trim();


    if (emailInput && passwordInput) {
        const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
   


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


if (loginForm) {
    loginForm.addEventListener('submit', loginFormHandler);
}


const signupFormHandler = async (event: Event): Promise<void> => {
    event.preventDefault();


    const nameInput = document.querySelector('#name-signup') as HTMLInputElement;
    const emailInput = document.querySelector('#email-signup') as HTMLInputElement;
    const passwordInput = document.querySelector('#password-signup') as HTMLInputElement;
    const steamIdInput = document.querySelector('#steamId-signup') as HTMLInputElement;


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


if (registerForm) {
    registerForm.addEventListener('submit', signupFormHandler);
}


document
    .querySelector('.login-form')
    ?.addEventListener('submit', loginFormHandler);


document
    .querySelector('.signup-form')
    ?.addEventListener('submit', signupFormHandler);
  