let boxElOne = document.getElementById("#placeholderBox1");
let boxElTwo = document.getElementById("#placeholderBox2");

function displayImage(selectId, imageBoxId, placeholderBoxId) {
    let selectedItem = document.getElementById(selectId).value;
    let imageBox = document.getElementById(imageBoxId);
    let placeholderBox = document.getElementById(placeholderBoxId);

    if (selectedItem == '') {
        placeholderBox.textContent = 'Select an item';
        placeholderBox.setAttribute(style, "url:")
    } else {
    placeholderBox.textContent = null;
    placeholderBox.setAttribute(style, "url: ")
    }
}