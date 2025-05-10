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
  // Change the menu toggle icon depending on the menu state
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
    // Close the menu when a link is clicked
    toggleMenu();
    // Get the target element and its position
    let element = document.getElementById(key);
    let elementPosition = element.getBoundingClientRect().top;
    let elementOffset = elementPosition + window.scrollY - headerOffset - 10;
    // Smoothly scroll to the target element
    window.scrollTo({
      top: elementOffset,
      behavior: "smooth",
    });
  });
});

// Add event listener to each menu link on PC
Object.entries(menuLinksPc).forEach(([key, value]) => {
  value.addEventListener("click", () => {
    // Get the target element and its position
    let elementPc = document.getElementById(key);
    let elementPositionPc = elementPc.getBoundingClientRect().top;
    let elementOffsetPc = elementPositionPc + window.scrollY - headerOffset;
    // Smoothly scroll to the target element
    window.scrollTo({
      top: elementOffsetPc,
      behavior: "smooth",
    });
  });
});

// Lazy load contact section's background image
const kontaktSection = document.getElementById("kontakt");
if (kontakt) {
  const kontaktObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          kontaktSection.classList.add("bg-loaded");
          observer.unobserve(kontaktSection); // Stop observing once loaded
        }
      });
    },
    { rootMargin: "0px 0px 200px 0px" }
  ); // Load when 200px from bottom of viewport

  kontaktObserver.observe(kontaktSection);
}
