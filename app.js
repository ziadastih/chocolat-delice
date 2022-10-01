const toggleMenuBtn = document.getElementById("toggle-menu");
const linksContainer = document.querySelector(".nav-links-container");
const heroDescription = document.querySelector(".hero-description");
const buttonContainer = document.querySelector(".button-container");
toggleMenuBtn.addEventListener("click", () => {
  linksContainer.classList.toggle("show-links");
  toggleMenuBtn.classList.toggle("rotate-toggle");
});

window.addEventListener("DOMContentLoaded", () => {
  animateSlogan();
  setTimeout(() => {
    buttonContainer.classList.add("show-opacity");
    heroDescription.classList.add("show-opacity");
  }, 1000);
  setTimeout(() => {
    animateImages();
  }, 1000);
});

const animateImages = () => {
  const imageContainer = document.querySelector(".image-container");
  let charachter = 0;
  let timer = setInterval(onTick, 300);

  function onTick() {
    let image = imageContainer.querySelectorAll(".image")[charachter];
    charachter++;

    image.classList.add("show-image");
    if (charachter === 9) {
      clearInterval(timer);
      timer = null;
    }
  }
};

const animateSlogan = () => {
  const sloganText = document.querySelector(".slogan");
  const strSlogan = sloganText.innerText;
  const splitSlogan = strSlogan.split("");
  console.log(splitSlogan);
  sloganText.innerHTML = "";
  for (let i = 0; i < splitSlogan.length; i++) {
    sloganText.innerHTML += `<span class = "slogan-span">${strSlogan[i]}</span>`;
  }

  let number = 0;
  let sloganTimer = setInterval(onCount, 50);

  function onCount() {
    const sloganSpans = sloganText.querySelectorAll(".slogan-span")[number];
    sloganSpans.classList.add("show-opacity");
    number++;
    if (number === splitSlogan.length) {
      clearInterval(sloganTimer);
      sloganTimer = null;
    }
  }
};
