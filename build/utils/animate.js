/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/tingle.js/dist/tingle.min.js":
/*!***************************************************!*\
  !*** ./node_modules/tingle.js/dist/tingle.min.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(t,o){ true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (o),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):0}(this,function(){var o=!1;function t(t){this.opts=function(){for(var t=1;t<arguments.length;t++)for(var o in arguments[t])arguments[t].hasOwnProperty(o)&&(arguments[0][o]=arguments[t][o]);return arguments[0]}({},{onClose:null,onOpen:null,beforeOpen:null,beforeClose:null,stickyFooter:!1,footer:!1,cssClass:[],closeLabel:"Close",closeMethods:["overlay","button","escape"]},t),this.init()}function e(){this.modalBoxFooter&&(this.modalBoxFooter.style.width=this.modalBox.clientWidth+"px",this.modalBoxFooter.style.left=this.modalBox.offsetLeft+"px")}return t.prototype.init=function(){if(!this.modal)return function(){this.modal=document.createElement("div"),this.modal.classList.add("tingle-modal"),0!==this.opts.closeMethods.length&&-1!==this.opts.closeMethods.indexOf("overlay")||this.modal.classList.add("tingle-modal--noOverlayClose");this.modal.style.display="none",this.opts.cssClass.forEach(function(t){"string"==typeof t&&this.modal.classList.add(t)},this),-1!==this.opts.closeMethods.indexOf("button")&&(this.modalCloseBtn=document.createElement("button"),this.modalCloseBtn.type="button",this.modalCloseBtn.classList.add("tingle-modal__close"),this.modalCloseBtnIcon=document.createElement("span"),this.modalCloseBtnIcon.classList.add("tingle-modal__closeIcon"),this.modalCloseBtnIcon.innerHTML='<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><path d="M.3 9.7c.2.2.4.3.7.3.3 0 .5-.1.7-.3L5 6.4l3.3 3.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L6.4 5l3.3-3.3c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L5 3.6 1.7.3C1.3-.1.7-.1.3.3c-.4.4-.4 1 0 1.4L3.6 5 .3 8.3c-.4.4-.4 1 0 1.4z" fill="#000" fill-rule="nonzero"/></svg>',this.modalCloseBtnLabel=document.createElement("span"),this.modalCloseBtnLabel.classList.add("tingle-modal__closeLabel"),this.modalCloseBtnLabel.innerHTML=this.opts.closeLabel,this.modalCloseBtn.appendChild(this.modalCloseBtnIcon),this.modalCloseBtn.appendChild(this.modalCloseBtnLabel));this.modalBox=document.createElement("div"),this.modalBox.classList.add("tingle-modal-box"),this.modalBoxContent=document.createElement("div"),this.modalBoxContent.classList.add("tingle-modal-box__content"),this.modalBox.appendChild(this.modalBoxContent),-1!==this.opts.closeMethods.indexOf("button")&&this.modal.appendChild(this.modalCloseBtn);this.modal.appendChild(this.modalBox)}.call(this),function(){this._events={clickCloseBtn:this.close.bind(this),clickOverlay:function(t){var o=this.modal.offsetWidth-this.modal.clientWidth,e=t.clientX>=this.modal.offsetWidth-15,s=this.modal.scrollHeight!==this.modal.offsetHeight;if("MacIntel"===navigator.platform&&0==o&&e&&s)return;-1!==this.opts.closeMethods.indexOf("overlay")&&!function(t,o){for(;(t=t.parentElement)&&!t.classList.contains(o););return t}(t.target,"tingle-modal")&&t.clientX<this.modal.clientWidth&&this.close()}.bind(this),resize:this.checkOverflow.bind(this),keyboardNav:function(t){-1!==this.opts.closeMethods.indexOf("escape")&&27===t.which&&this.isOpen()&&this.close()}.bind(this)},-1!==this.opts.closeMethods.indexOf("button")&&this.modalCloseBtn.addEventListener("click",this._events.clickCloseBtn);this.modal.addEventListener("mousedown",this._events.clickOverlay),window.addEventListener("resize",this._events.resize),document.addEventListener("keydown",this._events.keyboardNav)}.call(this),document.body.appendChild(this.modal,document.body.firstChild),this.opts.footer&&this.addFooter(),this},t.prototype._busy=function(t){o=t},t.prototype._isBusy=function(){return o},t.prototype.destroy=function(){null!==this.modal&&(this.isOpen()&&this.close(!0),function(){-1!==this.opts.closeMethods.indexOf("button")&&this.modalCloseBtn.removeEventListener("click",this._events.clickCloseBtn);this.modal.removeEventListener("mousedown",this._events.clickOverlay),window.removeEventListener("resize",this._events.resize),document.removeEventListener("keydown",this._events.keyboardNav)}.call(this),this.modal.parentNode.removeChild(this.modal),this.modal=null)},t.prototype.isOpen=function(){return!!this.modal.classList.contains("tingle-modal--visible")},t.prototype.open=function(){if(!this._isBusy()){this._busy(!0);var t=this;return"function"==typeof t.opts.beforeOpen&&t.opts.beforeOpen(),this.modal.style.removeProperty?this.modal.style.removeProperty("display"):this.modal.style.removeAttribute("display"),document.getSelection().removeAllRanges(),this._scrollPosition=window.pageYOffset,document.body.classList.add("tingle-enabled"),document.body.style.top=-this._scrollPosition+"px",this.setStickyFooter(this.opts.stickyFooter),this.modal.classList.add("tingle-modal--visible"),"function"==typeof t.opts.onOpen&&t.opts.onOpen.call(t),t._busy(!1),this.checkOverflow(),this}},t.prototype.close=function(t){if(!this._isBusy()){if(this._busy(!0),!1,"function"==typeof this.opts.beforeClose)if(!this.opts.beforeClose.call(this))return void this._busy(!1);document.body.classList.remove("tingle-enabled"),document.body.style.top=null,window.scrollTo({top:this._scrollPosition,behavior:"instant"}),this.modal.classList.remove("tingle-modal--visible");var o=this;o.modal.style.display="none","function"==typeof o.opts.onClose&&o.opts.onClose.call(this),o._busy(!1)}},t.prototype.setContent=function(t){return"string"==typeof t?this.modalBoxContent.innerHTML=t:(this.modalBoxContent.innerHTML="",this.modalBoxContent.appendChild(t)),this.isOpen()&&this.checkOverflow(),this},t.prototype.getContent=function(){return this.modalBoxContent},t.prototype.addFooter=function(){return function(){this.modalBoxFooter=document.createElement("div"),this.modalBoxFooter.classList.add("tingle-modal-box__footer"),this.modalBox.appendChild(this.modalBoxFooter)}.call(this),this},t.prototype.setFooterContent=function(t){return this.modalBoxFooter.innerHTML=t,this},t.prototype.getFooterContent=function(){return this.modalBoxFooter},t.prototype.setStickyFooter=function(t){return this.isOverflow()||(t=!1),t?this.modalBox.contains(this.modalBoxFooter)&&(this.modalBox.removeChild(this.modalBoxFooter),this.modal.appendChild(this.modalBoxFooter),this.modalBoxFooter.classList.add("tingle-modal-box__footer--sticky"),e.call(this),this.modalBoxContent.style["padding-bottom"]=this.modalBoxFooter.clientHeight+20+"px"):this.modalBoxFooter&&(this.modalBox.contains(this.modalBoxFooter)||(this.modal.removeChild(this.modalBoxFooter),this.modalBox.appendChild(this.modalBoxFooter),this.modalBoxFooter.style.width="auto",this.modalBoxFooter.style.left="",this.modalBoxContent.style["padding-bottom"]="",this.modalBoxFooter.classList.remove("tingle-modal-box__footer--sticky"))),this},t.prototype.addFooterBtn=function(t,o,e){var s=document.createElement("button");return s.innerHTML=t,s.addEventListener("click",e),"string"==typeof o&&o.length&&o.split(" ").forEach(function(t){s.classList.add(t)}),this.modalBoxFooter.appendChild(s),s},t.prototype.resize=function(){console.warn("Resize is deprecated and will be removed in version 1.0")},t.prototype.isOverflow=function(){return window.innerHeight<=this.modalBox.clientHeight},t.prototype.checkOverflow=function(){this.modal.classList.contains("tingle-modal--visible")&&(this.isOverflow()?this.modal.classList.add("tingle-modal--overflow"):this.modal.classList.remove("tingle-modal--overflow"),!this.isOverflow()&&this.opts.stickyFooter?this.setStickyFooter(!1):this.isOverflow()&&this.opts.stickyFooter&&(e.call(this),this.setStickyFooter(!0)))},{modal:t}});

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************************!*\
  !*** ./src/utils/animate.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ abelDisplayAnimate)
/* harmony export */ });
/* harmony import */ var tingle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tingle.js */ "./node_modules/tingle.js/dist/tingle.min.js");
/* harmony import */ var tingle_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tingle_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);


// Utility functions
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
    shape.style.animation = `rotate ${5 + getRandomInt(5)}s linear infinite`;
  } else if (selectedAnimation === 'scale') {
    shape.style.animation = `scale ${5 + getRandomInt(5)}s linear infinite`;
  } else if (selectedAnimation === 'skew') {
    shape.style.animation = `skew ${5 + getRandomInt(5)}s linear infinite`;
  }
  return selectedAnimation;
}

// function debounce( func, wait ) {
// 	let timeout;
// 	return function executedFunction( ...args ) {
// 		const later = () => {
// 			clearTimeout( timeout );
// 			func( ...args );
// 		};
// 		clearTimeout( timeout );
// 		timeout = setTimeout( later, wait );
// 	};
// }

// Animation and shape change functions
function changeColorAndShape() {
  if (animationPaused) return;
  const shapes = document.querySelectorAll('.shape');
  const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
  const grid = [];
  const gridSize = 200; // Adjust this value based on your needs
  const container = document.querySelector('.abel-wrapper');
  const columns = Math.floor(container.offsetWidth / gridSize);
  const rows = Math.floor(container.offsetHeight / gridSize);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      grid.push({
        top: i * gridSize,
        left: j * gridSize
      });
    }
  }

  // Shuffle the grid array to randomize the order of the cells
  for (let i = grid.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [grid[i], grid[j]] = [grid[j], grid[i]]; // Swap grid[i] and grid[j]
  }

  shapes.forEach((shape, index) => {
    const initialColor = getRandomColor(colors);
    const initialColor2 = getRandomColor(colors);
    shape.style.backgroundImage = `radial-gradient(circle at center, ${initialColor}, ${initialColor2})`;
    shape.style.borderColor = initialColor;
    const initialShape = getRandomShape();
    shape.style.borderRadius = ['circle', 'ellipse'].includes(initialShape) ? '50%' : '0';
    const gridBox = shape.parentElement.getBoundingClientRect();
    const width = Math.floor(gridBox.width * (0.15 + Math.random() * 0.15)); // Limit shape size
    const height = initialShape === 'rectangle' ? Math.floor(gridBox.height * (0.15 + Math.random() * 0.15)) : width;
    shape.style.width = `${width}px`;
    shape.style.height = `${height}px`;
    const position = grid[index % grid.length];
    shape.style.top = `${position.top}px`;
    shape.style.left = `${position.left}px`;
    const positionTransition = 'top 1s ease-in-out 0s, left 1s ease-in-out 0s';
    shape.style.transition = positionTransition;
    shape.addEventListener('transitionend', function (e) {
      if (e.propertyName !== 'top') return;
      setTimeout(() => {
        const positionTransition = 'top 1s ease-in-out 0s, left 1s ease-in-out 0s';
        shape.style.transition = positionTransition;
        const animation = applyRandomAnimation(shape);
        shape.removeEventListener('mouseover', onMouseOver);
        shape.removeEventListener('mouseout', onMouseOut);
        shape.addEventListener('mouseover', onMouseOver);
        shape.addEventListener('mouseout', onMouseOut);
        shape.dataset.animation = animation;
      }, 1000);
      setTimeout(() => {
        const colorTransition = `background-color 1s ease-in-out ${index * 100}ms, border-color 1s ease-in-out ${index * 200}ms`;
        const shapeTransition = `border-radius 1s ease-in-out ${index * 200}ms`;
        shape.style.transition = `${colorTransition}, ${shapeTransition}`;
        const color = getRandomColor(colors);
        shape.style.backgroundColor = color;
        shape.style.borderColor = color;
        const randomShape = getRandomShape();
        shape.style.borderRadius = ['circle', 'ellipse'].includes(randomShape) ? '50%' : '0';
      }, 1000 + index * 100); // Adding some delay for each shape
    });
  });
}

function resizeElements() {
  const shapes = document.querySelectorAll('.shape');
  const numberOfRows = Math.ceil(Math.sqrt(shapes.length)) * 2; // Increase grid size

  shapes.forEach((shape, index) => {
    shape.style.gridColumn = `${index % numberOfRows + 1} / span 1`;
    shape.style.gridRow = `${Math.floor(index / numberOfRows) + 1} / span 1`;
  });
}
let animationPaused = false;
let intervalId;
function onMouseOver() {
  animationPaused = true;
  this.style.animationPlayState = 'paused';
}
function onMouseOut() {
  animationPaused = false;
  this.style.animationPlayState = 'running';
}

// Main functions
function expandShape(shape) {
  if (!shape.dataset) return;
  const post = JSON.parse(shape.dataset.post);

  // Disable animations when the shape is expanded
  shape.style.animation = 'none';

  // Create a new tingle modal
  const modal = new (tingle_js__WEBPACK_IMPORTED_MODULE_0___default().modal)({
    footer: false,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: 'Close',
    cssClass: ['custom-class-1', 'custom-class-2'],
    onOpen: () => {},
    onClose: () => {
      shape.style.animation = '';
    }
  });

  // Set the modal content
  modal.setContent(`
	  <h2>${post.title}</h2>
	  <img src="${post.img_src}" alt="${post.alt}" width="${post.width}" height="${post.height}" loading="lazy" />
	  <a href="${post.link}">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Read more')}</a>
	`);

  // Open the modal
  modal.open();
  clearInterval(intervalId);
}
function startAnimation() {
  const wrapper = document.getElementsByClassName('abel-wrapper');
  if (wrapper !== null) {
    try {
      changeColorAndShape();
      intervalId = setInterval(() => {
        if (!animationPaused) changeColorAndShape();
      }, 5000);
      resizeElements();
      const shapeElements = document.querySelectorAll('.shape');
      shapeElements.forEach(shape => {
        shape.removeEventListener('click', onShapeClick);
        shape.addEventListener('click', onShapeClick);
      });
      window.addEventListener('load', resizeElements);
      window.addEventListener('resize', resizeElements);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('An error occurred while executing the script:', error);
    }
  }
}
function onShapeClick(e) {
  e.preventDefault();
  expandShape(this, true);
}

// Initialize the animations
document.addEventListener('DOMContentLoaded', () => {
  if (!document.body.classList.contains('wp-admin')) {
    startAnimation();
  }
});
function abelDisplayAnimate() {
  startAnimation();
}
})();

/******/ })()
;
//# sourceMappingURL=animate.js.map