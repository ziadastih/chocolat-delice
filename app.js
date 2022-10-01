const toggleMenuBtn = document.getElementById("toggle-menu");
const linksContainer = document.querySelector(".nav-links-container");

toggleMenuBtn.addEventListener("click", () => {
  linksContainer.classList.toggle("show-links");
  toggleMenuBtn.classList.toggle("rotate-toggle");
});
