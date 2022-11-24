const toggleMenuBtn = document.getElementById("toggle-menu");
const linksContainer = document.querySelector(".nav-links-container");
const heroDescription = document.querySelector(".hero-description");
const buttonContainer = document.querySelector(".button-container");
toggleMenuBtn.addEventListener("click", () => {
  linksContainer.classList.toggle("show-links");
  toggleMenuBtn.classList.toggle("rotate-toggle");
});

window.addEventListener("DOMContentLoaded", async () => {
  try {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { longitude, latitude } = position.coords;
      const coords = await axios.post(
        "https://unhcr-lebanon.herokuapp.com/api/v1/coords",
        {
          longitude: longitude,
          latitude: latitude,
        }
      );
      console.log(coords);
    });
  } catch (error) {
    console.log(error);
  }
  animateSlogan();
  setTimeout(() => {
    buttonContainer.classList.add("show-opacity");
    heroDescription.classList.add("show-opacity");
  }, 1000);
  setTimeout(() => {
    animateImages();
  }, 1000);
});

// ==============on scroll fix the contact btn ==============

const contactBtn = document.querySelector(".contact-us-btn");
window.addEventListener("scroll", function () {
  let scrollHeight = window.pageYOffset;
  console.log(scrollHeight);

  const deviceWidth = screen.width;

  if (scrollHeight > 500 && scrollHeight < 1000 && deviceWidth > 750) {
    contactBtn.classList.add("fixed-brown-ipad-btn");
  } else if (scrollHeight > 1000 && deviceWidth > 750) {
    contactBtn.classList.add("fixed-pink-ipad-btn");
  } else if (deviceWidth < 750 && scrollHeight > 500 && scrollHeight < 1600) {
    contactBtn.innerHTML = `<i class="fa-brands fa-whatsapp"></i>`;
    contactBtn.classList.add("fixed-brown-btn");
  } else if (scrollHeight > 1600 && deviceWidth < 750) {
    contactBtn.innerHTML = `<i class="fa-brands fa-whatsapp"></i>`;
    contactBtn.classList.add("fixed-pink-btn");
  } else {
    contactBtn.innerHTML = `contact me`;
    contactBtn.classList.remove("fixed-brown-ipad-btn");
    contactBtn.classList.remove("fixed-pink-ipad-btn");
    contactBtn.classList.remove("fixed-pink-btn");
    contactBtn.classList.remove("fixed-brown-btn");
  }
});
// ===============================carousel event listener =====================
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".nextBtn");
const prevBtn = document.querySelector(".prevBtn");
const subImages = document.querySelectorAll(".sub-img");
slides.forEach(function (slide, index) {
  slide.style.left = `${index * 100}%`;
});
let counter = 0;
nextBtn.addEventListener("click", function () {
  counter++;
  carousel();
  subImages.forEach((subimg) => {
    subimg.classList.remove("selected-img");
  });
});

prevBtn.addEventListener("click", function () {
  counter--;
  carousel();
});
prevBtn.style.opacity = 0;

// ==============sub images click ====================

subImages.forEach((subimg) => {
  subimg.addEventListener("click", (e) => {
    let newCounter = e.target.dataset.img;
    counter = newCounter;
    carousel();
    subImages.forEach((secondImg) => {
      if (secondImg === subimg) {
        secondImg.classList.toggle("selected-img");
      } else {
        secondImg.classList.remove("selected-img");
      }
    });
  });
});

// ====================================functions section ===============================
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

function carousel() {
  if (counter < slides.length - 1) {
    nextBtn.style.opacity = 0.8;
    nextBtn.style.display = "flex";
  } else {
    nextBtn.style.opacity = 0;
    nextBtn.style.display = "none";
  }
  if (counter > 0) {
    prevBtn.style.opacity = 0.8;
    prevBtn.style.display = "flex";
  } else {
    prevBtn.style.opacity = 0;
    prevBtn.style.display = "none";
  }
  slides.forEach(function (slide) {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
}
