const readMoreBtn = document.querySelector(".btn");
const parentContainer = document.querySelector(".parent-container");

readMoreBtn.addEventListener("click", () => {
    parentContainer.classList.toggle("open"); 
});
