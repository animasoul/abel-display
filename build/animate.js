/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/animate.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ abelDisplayAnimate)
/* harmony export */ });
function debounce(func, wait) {
  let timeout;
  return function executedFunction() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function getRandomColor(colors, currentColor) {
  let newColor;
  do {
    newColor = colors[getRandomInt(colors.length)];
  } while (newColor === currentColor);
  return newColor;
}
function getRandomShape(currentShape) {
  const shapes = ['circle', 'square', 'rectangle', 'ellipse', 'triangle', 'pentagon', 'hexagon'];
  let newShape;
  do {
    newShape = shapes[getRandomInt(shapes.length)];
  } while (newShape === currentShape);
  return newShape;
}
function applyRandomAnimation(shape, currentAnimation) {
  const animations = ['rotation', 'scale', 'skew'];
  let selectedAnimation;
  do {
    selectedAnimation = animations[getRandomInt(animations.length)];
  } while (selectedAnimation === currentAnimation);
  if (selectedAnimation === 'rotation') {
    shape.style.animation = `rotate ${3 + getRandomInt(4)}s linear infinite`;
  } else if (selectedAnimation === 'scale') {
    shape.style.animation = `scale ${3 + getRandomInt(4)}s linear infinite`;
  } else if (selectedAnimation === 'skew') {
    shape.style.animation = `skew ${3 + getRandomInt(4)}s linear infinite`;
  }
  return selectedAnimation;
}
let intervalId;
function changeColorAndShape() {
  const shapes = document.querySelectorAll('.shape');
  const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
  shapes.forEach(shape => {
    const color = getRandomColor(colors);
    shape.style.backgroundColor = color;
    shape.style.borderColor = color;
    const randomShape = getRandomShape();
    if (randomShape === 'circle') {
      shape.style.borderRadius = '50%';
    } else if (randomShape === 'square') {
      shape.style.borderRadius = '0';
    } else if (randomShape === 'rectangle') {
      shape.style.borderRadius = '0';
    } else if (randomShape === 'ellipse') {
      shape.style.borderRadius = '50%';
    }

    // Calculate the size based on the grid cell's dimensions
    const gridSize = shape.parentElement.getBoundingClientRect();
    const width = Math.floor(gridSize.width * (0.5 + Math.random() * 0.5));
    const height = randomShape === 'rectangle' ? Math.floor(gridSize.height * (0.5 + Math.random() * 0.5)) : width;
    shape.style.width = `${width}px`;
    shape.style.height = `${height}px`;
    const animation = applyRandomAnimation(shape);
    shape.dataset.animation = animation;

    // Update the event listeners
    shape.removeEventListener('mouseover', onMouseOver);
    shape.removeEventListener('mouseout', onMouseOut);
    shape.addEventListener('mouseover', onMouseOver);
    shape.addEventListener('mouseout', onMouseOut);
  });
}

// Define the onMouseOver and onMouseOut functions
function onMouseOver() {
  clearInterval(intervalId);
  this.style.animationPlayState = 'paused';
}
function onMouseOut() {
  intervalId = setInterval(changeColorAndShape, 3000);
  this.style.animationPlayState = 'running';
}
// Then set the interval
intervalId = setInterval(debounce(changeColorAndShape, 100), 3000);
function resizeElements() {
  const shapes = document.querySelectorAll('.shape');
  const numberOfRows = Math.ceil(Math.sqrt(shapes.length));
  shapes.forEach((shape, index) => {
    shape.style.gridColumn = `${index % numberOfRows + 1} / span 1`;
    shape.style.gridRow = `${Math.floor(index / numberOfRows) + 1} / span 1`;
  });
}
function startAnimation() {
  const wrapper = document.getElementById('abel-wrapper');
  if (wrapper !== null) {
    try {
      // Call the changeColorAndShape function immediately
      changeColorAndShape();
      const shapeElements = document.querySelectorAll('.shape');
      // eslint-disable-next-line no-unused-vars
      shapeElements.forEach(shape => {
        // ...
      });
      window.addEventListener('load', resizeElements);
      window.addEventListener('resize', resizeElements);
    } catch (error) {
      /* eslint-disable no-console */
      console.error('An error occurred while executing the script:', error);
      /* eslint-enable no-console */
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  startAnimation();
});
function abelDisplayAnimate() {
  startAnimation();
}
/******/ })()
;
//# sourceMappingURL=animate.js.map