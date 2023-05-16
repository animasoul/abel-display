/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./src/utils/animate.js ***!
  \******************************/
// Function to generate a unique random number in a range
const uniqueRand = (min, max, prev) => {
  let next = prev;
  while (prev === next) next = Math.floor(Math.random() * (max - min + 1) + min);
  return next;
};
const combinations = [{
  configuration: 1,
  roundness: 1
}, {
  configuration: 1,
  roundness: 2
}, {
  configuration: 1,
  roundness: 4
}, {
  configuration: 2,
  roundness: 2
}, {
  configuration: 2,
  roundness: 3
}, {
  configuration: 3,
  roundness: 3
}];
let prev = 0;
let intervalId;

// Function to start the animation
const startAnimation = wrappers => {
  if (intervalId !== undefined) return;
  intervalId = setInterval(() => {
    wrappers.forEach(wrapper => {
      const index = uniqueRand(0, combinations.length - 1, prev),
        // Destructure the combination object
        {
          configuration,
          roundness
        } = combinations[index];
      wrapper.dataset.configuration = configuration;
      wrapper.dataset.roundness = roundness;
      prev = index;
    });
  }, 3000);
};

// Define a function to start the animation on your wrappers
function startAnimationOnWrappers(wrappers) {
  startAnimation(wrappers);
}

// Create a new MutationObserver instance
const observer = new MutationObserver(mutationsList => {
  for (const mutation of mutationsList) {
    if (mutation.addedNodes.length) {
      const newWrappers = document.querySelectorAll('.abel-wrapper'),
        shapes = document.querySelectorAll('.shape');

      // Start animation on wrappers
      newWrappers.forEach(() => {
        startAnimationOnWrappers(newWrappers);
      });

      // Attach events to shapes
      shapes.forEach(shape => {
        if (!shape.dataset.eventAttached) {
          const dialog = shape.querySelector('dialog');
          shape.addEventListener('click', () => {
            if (dialog.open) dialog.close();else dialog.showModal();
          });
          const closeButton = dialog.querySelector('.close-button');
          closeButton.addEventListener('click', event => {
            event.stopPropagation();
            dialog.close();
          });
          shape.dataset.eventAttached = true;
        }
      });
    }
  }
});
document.addEventListener('DOMContentLoaded', () => {
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
/******/ })()
;
//# sourceMappingURL=animate.js.map