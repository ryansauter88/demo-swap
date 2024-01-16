const loginForm = document.querySelector('.login-container form');

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
            document.location.replace('/profile');
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

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const steamId = steamIdInput.value.trim();

    if (name && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password, steamId }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.login-form')
    ?.addEventListener('submit', loginFormHandler);

document
    .querySelector('.signup-form')
    ?.addEventListener('submit', signupFormHandler);
  