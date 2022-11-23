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

const menutoggle = document.getElementById("#menu-toggle");
const menu = document.getElementById("menu");
const nav = document.querySelector("nav");
const header = document.querySelector("header");
const main = document.querySelector("main");
const footer = document.querySelector("footer");

function toggleMenu() {
  menu.classList.toggle("active");
  nav.classList.toggle("bd-open");
  header.classList.toggle("bd-open");
  main.classList.toggle("bd-open");
  footer.classList.toggle("bd-open");
};

main.addEventListener("click", () => {
  if (document.getElementById("menu").classList.contains("active")) {
    toggleMenu();
  }
}, true);

header.addEventListener("click", () => {
  if (document.getElementById("menu").classList.contains("active")) {
    toggleMenu();
  }
}, true);