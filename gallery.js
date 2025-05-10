document.addEventListener("DOMContentLoaded", () => {
  // Configuration object for all image galleries on the page.
  // Each key (e.g., "gallery1") is a unique identifier for a gallery.
  // - slideClassName: The CSS class shared by all <img> slide elements in that gallery.
  // - currentSlideIndex: Tracks the 0-based index of the currently visible slide.
  // - slides: An HTMLCollection of the <img> elements for that gallery (populated during initialization)
  const galleriesConfig = {
    gallery1: {
      slideClassName: "mySlides",
      currentSlideIndex: 0,
      slides: [],
    },
    gallery2: {
      slideClassName: "mySlides2",
      currentSlideIndex: 0,
      slides: [],
    },
    gallery3: {
      slideClassName: "mySlides3",
      currentSlideIndex: 0,
      slides: [],
    },
  };

  // Initialize each gallery defined in galleriesConfig
  for (const galleryId in galleriesConfig) {
    const config = galleriesConfig[galleryId];
    // Find all slides for the current gallery using its specific class name
    config.slides = document.getElementsByClassName(config.slideClassName);

    // Proceed only if slides were found
    if (config.slides.length > 0) {
      // Display the first slide and trigger a preload of its neighbors
      showSlide(galleryId, 0);
    } else {
      // Log a warning if no slides were found for the current gallery
      console.warn(
        `Gallery with ID "${galleryId}" and slide class "${config.slideClassName}" found no slides.`
      );
    }
  }

  /**
   * Displays a specific slide within a given gallery and handles lazy loading.
   * @param {string} galleryId - The ID of the gallery (key from galleriesConfig).
   * @param {number} slideIndex - The 0-based index of the slide to display.
   */
  function showSlide(galleryId, slideIndex) {
    const config = galleriesConfig[galleryId]; // Get the configuration for the specified gallery

    // Proceed only if a valid configuration exists for this gallery
    if (!config || config.slides.length === 0) {
      return;
    }

    const slides = config.slides; // Get the collection of slide elements
    let newIndex = slideIndex; // The target slide index

    // Implement looping: if newIndex is out of bounds, wrap around
    if (newIndex >= slides.length) newIndex = 0;
    else if (newIndex < 0) newIndex = slides.length - 1;

    // Hide all slides in the gallery before showing the target one
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    // Get the target slide
    const targetSlide = slides[newIndex];
    // Handle lazy loading: if the target slide has a data-src, load the image
    if (targetSlide.dataset.src) {
      targetSlide.src = targetSlide.dataset.src;
      delete targetSlide.dataset.src;
    }

    // Display the target slide
    targetSlide.style.display = "block";
    // Update the current slide index in the gallery's configuration
    config.currentSlideIndex = newIndex;

    // Preload next and previous slides. The modulo operator (%) handles looping
    if (slides.length > 1) {
      // Only preload if there's more than one slide
      const nextSlideIndex = (newIndex + 1) % slides.length;
      const prevSlideIndex = (newIndex - 1 + slides.length) % slides.length;

      // Preload next image (if it's not the current one)
      if (nextSlideIndex !== newIndex) {
        preloadImage(slides[nextSlideIndex]);
      }
      // Preload previous image (if it's not the current one and not the same as next)
      if (prevSlideIndex !== newIndex && prevSlideIndex !== nextSlideIndex) {
        preloadImage(slides[prevSlideIndex]);
      }
    }
  }

  /**
   * Preloads an image if it has a data-src attribute.
   * @param {HTMLImageElement} imageElement - The image element to preload.
   */
  function preloadImage(imageElement) {
    if (imageElement && imageElement.dataset && imageElement.dataset.src) {
      // Check if the image's src is not already set to the data-src (to avoid redundant preloading)
      if (!imageElement.src || imageElement.src !== imageElement.dataset.src) {
        const img = new Image(); // Create an in-memory image object
        img.src = imageElement.dataset.src; // Setting src triggers the browser to download the image
      }
    }
  }

  // Add event listeners to all gallery navigation buttons
  const galleryButtons = document.querySelectorAll(".gallery-nav-button");
  galleryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Get the gallery ID and action (prev/next) from the button's data attributes
      const galleryId = button.dataset.galleryId;
      const action = button.dataset.galleryAction;
      const config = galleriesConfig[galleryId]; // Get the configuration for the button's gallery

      // Proceed only if a valid configuration exists for this gallery
      if (config) {
        // Calculate the new slide index based on the current index and action and show the slide
        let newIndex = config.currentSlideIndex + (action === "next" ? 1 : -1);
        showSlide(galleryId, newIndex);
      } else {
        // Log a warning if a button is clicked for an unconfigured gallery
        console.warn(
          `Button clicked for unconfigured gallery ID: ${galleryId}`
        );
      }
    });
  });
});
