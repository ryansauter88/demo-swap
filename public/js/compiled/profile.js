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
const openModal = () => {
    const modal = document.getElementById('passwordModal');
    modal.style.display = 'block';
};
// Function to close the password change modal.
const closeModal = () => {
    const modal = document.getElementById('passwordModal');
    modal.style.display = 'none';
};
// Event listeners for the modal.
document.addEventListener('DOMContentLoaded', () => {
    const changePasswordButton = document.getElementById('change-password-button');
    const closeButton = document.querySelector('.close-button');
    const passwordChangeForm = document.getElementById('passwordChangeForm');
    changePasswordButton === null || changePasswordButton === void 0 ? void 0 : changePasswordButton.addEventListener('click', openModal);
    closeButton === null || closeButton === void 0 ? void 0 : closeButton.addEventListener('click', closeModal);
    passwordChangeForm === null || passwordChangeForm === void 0 ? void 0 : passwordChangeForm.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const newPassword = document.getElementById('new-password').value;
        const confirmNewPassword = document.getElementById('confirm-new-password').value;
        if (newPassword !== confirmNewPassword) {
            alert("Passwords do not match.");
            return;
        }
        try {
            const response = yield fetch('/api/users/change-password', {
                method: 'POST',
                body: JSON.stringify({ newPassword }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                alert('Password successfully changed');
                closeModal();
            }
            else {
                const responseData = yield response.json();
                alert(`Failed to change password: ${responseData.message}`);
            }
        }
        catch (error) {
            console.error('Error:', error);
            alert('An error occurred while changing the password');
        }
    }));
});
//# sourceMappingURL=profile.js.map