const openModal = (): void => {
  const modal = document.getElementById('passwordModal') as HTMLElement;
  modal.style.display = 'block';
};


// Function to close the password change modal.
const closeModal = (): void => {
  const modal = document.getElementById('passwordModal') as HTMLElement;
  modal.style.display = 'none';
};


// Event listeners for the modal.
document.addEventListener('DOMContentLoaded', () => {
  const changePasswordButton = document.getElementById('change-password-button');
  const closeButton = document.querySelector('.close-button') as HTMLElement;
  const passwordChangeForm = document.getElementById('passwordChangeForm') as HTMLFormElement;


  changePasswordButton?.addEventListener('click', openModal);
  closeButton?.addEventListener('click', closeModal);


  passwordChangeForm?.addEventListener('submit', async (event: Event) => {
      event.preventDefault();
      const newPassword = (document.getElementById('new-password') as HTMLInputElement).value;
      const confirmNewPassword = (document.getElementById('confirm-new-password') as HTMLInputElement).value;


      if (newPassword !== confirmNewPassword) {
          alert("Passwords do not match.");
          return;
      }


      try {
          const response = await fetch('/api/users/change-password', {
              method: 'POST',
              body: JSON.stringify({ newPassword }),
              headers: {
                  'Content-Type': 'application/json',
                 
              },
          });
 
          if (response.ok) {
              alert('Password successfully changed');
              closeModal();
          } else {
              const responseData = await response.json();
              alert(`Failed to change password: ${responseData.message}`);
          }
      } catch (error) {
          console.error('Error:', error);
          alert('An error occurred while changing the password');
      }
  });
});



  