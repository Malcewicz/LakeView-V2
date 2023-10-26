document.addEventListener("DOMContentLoaded", function () {
  var lazyloadImages = document.querySelectorAll("img.lazy");
  var lazyloadThrottleTimeout;

  function lazyload() {
    if (lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    }

    lazyloadThrottleTimeout = setTimeout(function () {
      var scrollTop = window.pageYOffset;
      lazyloadImages.forEach(function (img) {
        if (img.offsetTop < window.innerHeight + scrollTop) {
          img.src = img.dataset.src;
          img.classList.remove("lazy");
        }
      });
      if (lazyloadImages.length == 0) {
        document.removeEventListener("scroll", lazyload);
        window.removeEventListener("resize", lazyload);
        window.removeEventListener("orientationChange", lazyload);
      }
    }, 20);
  }

  document.addEventListener("scroll", lazyload);
  window.addEventListener("resize", lazyload);
  window.addEventListener("orientationChange", lazyload);
});

// Create variables for each element class
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");
const nav = document.querySelector("nav");
const header = document.querySelector("header");
const main = document.querySelector("main");
const footer = document.querySelector("footer");

// Define toggleMenu function
function toggleMenu() {
  menu.classList.toggle("active");
  nav.classList.toggle("menu-open");
  header.classList.toggle("menu-open");
  main.classList.toggle("menu-open");
  footer.classList.toggle("menu-open");
  if (menuToggle.innerHTML === "menu") {
    menuToggle.innerHTML = "close";
  } else {
    menuToggle.innerHTML = "menu";
  }
}

// Add event listener to header and main to close menu when clicked outside
[header, main].forEach((item) => {
  item.addEventListener(
    "click",
    () => {
      if (menu.classList.contains("active")) {
        toggleMenu();
      }
    },
    true
  );
});

// Create dictionary of all menu links on mobile
const menuLinks = {
  lokalizacja: document.getElementById("menu-lokalizacja"),
  apartamenty: document.getElementById("menu-apartamenty"),
  oferta: document.getElementById("menu-oferta"),
  atrakcje: document.getElementById("menu-atrakcje"),
  kontakt: document.getElementById("menu-kontakt"),
};

// Create dictionary of all menu links on desktop
const menuLinksPc = {
  apartamenty: document.getElementById("menu-apartamenty-pc"),
  oferta: document.getElementById("menu-oferta-pc"),
  atrakcje: document.getElementById("menu-atrakcje-pc"),
  kontakt: document.getElementById("menu-kontakt-pc"),
};

// Get header height
const headerOffset = 40;

// Add event listener to each menu link on mobile
Object.entries(menuLinks).forEach(([key, value]) => {
  value.addEventListener("click", () => {
    toggleMenu();
    let element = document.getElementById(key);
    let elementPosition = element.getBoundingClientRect().top;
    let elementOffset = elementPosition + window.scrollY - headerOffset - 10;
    window.scrollTo({
      top: elementOffset,
      behavior: "smooth",
    });
  });
});

// Add event listener to each menu link on PC
Object.entries(menuLinksPc).forEach(([key, value]) => {
  value.addEventListener("click", () => {
    let elementPc = document.getElementById(key);
    let elementPositionPc = elementPc.getBoundingClientRect().top;
    let elementOffsetPc = elementPositionPc + window.scrollY - headerOffset;
    window.scrollTo({
      top: elementOffsetPc,
      behavior: "smooth",
    });
  });
});
