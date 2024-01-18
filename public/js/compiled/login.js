"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
const loginForm = document.querySelector('.login-container form');
const registerForm = document.getElementById('register-form');
const loginFormHandler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const emailInput = document.querySelector('#email-login');
    const passwordInput = document.querySelector('#password-login');
    // const email = emailInput.value.trim();
    // const password = passwordInput.value.trim();
    if (emailInput && passwordInput) {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        if (email && password) {
            const response = yield fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                document.location.replace('/');
            }
            else {
                alert('Failed to log in');
            }
        }
    }
});
if (loginForm) {
    loginForm.addEventListener('submit', loginFormHandler);
}
const signupFormHandler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const nameInput = document.querySelector('#name-signup');
    const emailInput = document.querySelector('#email-signup');
    const passwordInput = document.querySelector('#password-signup');
    const steamIdInput = document.querySelector('#steamId-signup');
    const fullName = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const steamId = steamIdInput.value.trim();
    console.log(fullName);
    if (fullName && email && password) {
        const response = yield fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ fullName, email, password, steamId }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/');
        }
        else {
            alert(response.statusText);
        }
    }
});
if (registerForm) {
    registerForm.addEventListener('submit', signupFormHandler);
}
(_a = document
    .querySelector('.login-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', loginFormHandler);
(_b = document
    .querySelector('.signup-form')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', signupFormHandler);
//# sourceMappingURL=login.js.map