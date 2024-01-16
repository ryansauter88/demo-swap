const newFormHandler = async (event: Event): Promise<void> => {
  event.preventDefault();

  const nameInput = document.querySelector('#project-name') as HTMLInputElement;
  const fundingInput = document.querySelector('#project-funding') as HTMLInputElement;
  const descInput = document.querySelector('#project-desc') as HTMLInputElement;

  const name = nameInput.value.trim();
  const neededFunding = fundingInput.value.trim();
  const description = descInput.value.trim();

  if (name && neededFunding && description) {
      const response = await fetch(`/api/projects`, {
          method: 'POST',
          body: JSON.stringify({ name, neededFunding, description }),
          headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
          document.location.replace('/profile');
      } else {
          alert('Failed to create project');
      }
  }
};

const delButtonHandler = async (event: MouseEvent): Promise<void> => {
  const target = event.target as HTMLElement;
  if (target && target.hasAttribute('data-id')) {
      const id = target.getAttribute('data-id');

      const response = await fetch(`/api/projects/${id}`, {
          method: 'DELETE',
      });

      if (response.ok) {
          document.location.replace('/profile');
      } else {
          alert('Failed to delete project');
      }
  }
};

const newProjectForm = document.querySelector('.new-project-form');
if (newProjectForm) {
  newProjectForm.addEventListener('submit', newFormHandler);
}

const projectList = document.querySelector('.project-list') as HTMLElement;
if (projectList) {
  projectList.addEventListener('click', delButtonHandler);
}


  