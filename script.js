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

const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");
const nav = document.querySelector("nav");
const header = document.querySelector("header");
const main = document.querySelector("main");
const footer = document.querySelector("footer");
const headerOffset = 40;

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

header.addEventListener(
  "click",
  () => {
    if (menu.classList.contains("active")) {
      toggleMenu();
    }
  },
  true
);

main.addEventListener(
  "click",
  () => {
    if (menu.classList.contains("active")) {
      toggleMenu();
    }
  },
  true
);

document
  .getElementById("menu-lokalizacja")
  .addEventListener("click", scrollToLokalizacja);
function scrollToLokalizacja() {
  let lokalizacja = document.getElementById("lokalizacja");
  let lokalizacjaPosition = lokalizacja.getBoundingClientRect().top;
  let offsetLokalizacja =
    lokalizacjaPosition + window.scrollY - headerOffset - 10;
  window.scrollTo({
    top: offsetLokalizacja,
    behavior: "smooth",
  });
}

document
  .getElementById("menu-apartamenty")
  .addEventListener("click", scrollToApartamenty);
function scrollToApartamenty() {
  let apartamenty = document.getElementById("apartamenty");
  let apartamentyPosition = apartamenty.getBoundingClientRect().top;
  let offsetApart = apartamentyPosition + window.scrollY - headerOffset;
  window.scrollTo({
    top: offsetApart,
    behavior: "smooth",
  });
}

document
  .getElementById("menu-oferta")
  .addEventListener("click", scrollToOferta);
function scrollToOferta() {
  let oferta = document.getElementById("oferta");
  let ofertaPosition = oferta.getBoundingClientRect().top;
  let offsetOferta = ofertaPosition + window.scrollY - headerOffset;
  window.scrollTo({
    top: offsetOferta,
    behavior: "smooth",
  });
}

document
  .getElementById("menu-atrakcje")
  .addEventListener("click", scrollToAtrakcje);
function scrollToAtrakcje() {
  let atrakcje = document.getElementById("atrakcje");
  let atrakcjePosition = atrakcje.getBoundingClientRect().top;
  let offsetAtrakcje = atrakcjePosition + window.scrollY - headerOffset;
  window.scrollTo({
    top: offsetAtrakcje,
    behavior: "smooth",
  });
}

document
  .getElementById("menu-kontakt")
  .addEventListener("click", scrollToKontakt);
function scrollToKontakt() {
  let kontakt = document.getElementById("kontakt");
  let kontaktPosition = kontakt.getBoundingClientRect().top;
  let offsetKontakt = kontaktPosition + window.scrollY - headerOffset;
  window.scrollTo({
    top: offsetKontakt,
    behavior: "smooth",
  });
}
