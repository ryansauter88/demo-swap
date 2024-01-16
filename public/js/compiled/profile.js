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
const newFormHandler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const nameInput = document.querySelector('#project-name');
    const fundingInput = document.querySelector('#project-funding');
    const descInput = document.querySelector('#project-desc');
    const name = nameInput.value.trim();
    const neededFunding = fundingInput.value.trim();
    const description = descInput.value.trim();
    if (name && neededFunding && description) {
        const response = yield fetch(`/api/projects`, {
            method: 'POST',
            body: JSON.stringify({ name, neededFunding, description }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/profile');
        }
        else {
            alert('Failed to create project');
        }
    }
});
const delButtonHandler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const target = event.target;
    if (target && target.hasAttribute('data-id')) {
        const id = target.getAttribute('data-id');
        const response = yield fetch(`/api/projects/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            document.location.replace('/profile');
        }
        else {
            alert('Failed to delete project');
        }
    }
});
const newProjectForm = document.querySelector('.new-project-form');
if (newProjectForm) {
    newProjectForm.addEventListener('submit', newFormHandler);
}
const projectList = document.querySelector('.project-list');
if (projectList) {
    projectList.addEventListener('click', delButtonHandler);
}
//# sourceMappingURL=profile.js.map