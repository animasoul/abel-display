/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./script */ "./src/script.js");








const getFeaturedOrFirstImage = post => {
  if (post._embedded && post._embedded['wp:featuredmedia']) {
    return post._embedded['wp:featuredmedia'][0].source_url;
  }
  const content = post.content ? post.content.rendered : null;
  const imgRegex = /<img[^>]+src="(http:\/\/[^">]+|https:\/\/[^">]+)"/g;
  const match = imgRegex.exec(content);
  if (match && match[1]) {
    return match[1];
  }
  return null;
};
class AbelDisplayEdit extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor() {
    super(...arguments);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleDisplayStyleChange = this.handleDisplayStyleChange.bind(this);
  }
  handleCategoryChange = selectedCategories => {
    const categoryIds = selectedCategories.map(category => category.value);
    this.props.setAttributes({
      category: categoryIds
    });
  };
  handleTagChange = tags => {
    this.props.setAttributes({
      tags
    });
  };
  handleDisplayStyleChange = displayStyle => {
    this.props.setAttributes({
      displayStyle
    });
  };
  componentDidMount() {
    const {
      categories,
      tags,
      setAttributes
    } = this.props;
    // console.log("this.props: ");
    // console.log(this.props);

    if (!categories) {
      _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default()({
        path: '/wp/v2/categories?_fields=id,name'
      }).then(response => response.json()).then(fetchedCategories => {
        setAttributes({
          fetchedCategories
        });
      });
    }
    if (!tags) {
      _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default()({
        path: '/wp/v2/tags?_fields=id,name'
      }).then(response => response.json()).then(fetchedTags => {
        setAttributes({
          fetchedTags
        });
      });
    }
  }
  componentDidUpdate(prevProps) {
    const {
      posts,
      setAttributes
    } = this.props;
    if (posts !== prevProps.posts) {
      setAttributes({
        posts
      });
    }
    if (posts) {
      (0,_script__WEBPACK_IMPORTED_MODULE_6__["default"])();
    }
  }
  render() {
    const {
      category,
      tag,
      posts,
      displayStyle
    } = this.props.attributes;
    if (!category || !tag) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "wp-block-create-block-abel-display"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        id: "abel-wrapper"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "shape"
      }, 'Loading...')));
    }
    if (!posts || posts.length === 0) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('No posts found.');
    }
    // console.log("posts: ".post);
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: 'abel-display-posts abel-display-style-' + displayStyle
    }, posts && posts.length > 0 ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      id: "abel-wrapper"
    }, posts.map(post => {
      const imageSrc = getFeaturedOrFirstImage(post); // Get the featured or first image from the post
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
        className: "shape",
        href: post.link,
        key: post.id
      }, imageSrc && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
        src: imageSrc,
        alt: post.title.rendered,
        loading: "lazy"
      }), post.title.rendered);
    })) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      id: "abel-wrapper"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('No posts found.'))));
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__.compose)([(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.withSelect)((select, props) => {
  const {
    getEntityRecords
  } = select('core');
  const {
    category,
    tag
  } = props.attributes;
  const postsQuery = {
    per_page: -1,
    post_status: 'publish',
    post_type: 'post',
    _embed: true,
    _fields: 'id,link,title.rendered,content.rendered,_embedded.wp:featuredmedia'
  };
  if (category && category.length) {
    postsQuery.categories = category.join();
  }
  if (tag && tag.length) {
    postsQuery.tags = tag.join();
  }
  // console.log("postquery: ");
  // console.log(postsQuery);

  const posts = getEntityRecords('postType', 'post', postsQuery);
  // console.log("posts");
  // console.log(posts);

  return {
    posts
  };
}), (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.withColors)('backgroundColor', 'textColor')])(AbelDisplayEdit));

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./save */ "./src/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./block.json */ "./src/block.json");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_8__);

/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */




/**
 * WordPress dependencies
 */




/**
 * This function is a Higher Order Component that wraps the original block edit component.
 * It provides additional props to the wrapped component, which include the categories and tags
 * from the WordPress REST API.
 *
 * @param {Function} OriginalEdit The original edit component to wrap.
 * @return {Function} The wrapped edit component.
 */
const withCategoriesAndTags = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_8__.withSelect)(select => {
  const {
    getEntityRecords
  } = select('core');
  return {
    categories: getEntityRecords('taxonomy', 'category', {
      per_page: -1
    }),
    tags: getEntityRecords('taxonomy', 'post_tag', {
      per_page: -1
    })
  };
});

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_5__.name, {
  /**
   * Define block attributes.
   */
  attributes: {
    category: {
      type: 'array',
      default: []
    },
    tag: {
      type: 'array',
      default: []
    },
    posts: {
      type: 'array',
      default: []
    },
    displayStyle: {
      type: 'string',
      default: 'default'
    }
  },
  /**
   * @see ./edit.js
   */
  edit: withCategoriesAndTags(props => {
    const {
      categories,
      tags,
      setAttributes
    } = props;
    if (!categories || !tags) {
      return 'Loading...';
    }
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelBody, {
      title: "Filter Posts"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.SelectControl, {
      label: "Category",
      multiple: true,
      value: props.attributes.category,
      options: categories.map(category => ({
        label: category.name,
        value: category.id
      })),
      onChange: value => setAttributes({
        category: value
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.SelectControl, {
      label: "Tag",
      multiple: true,
      value: props.attributes.tag,
      options: tags.map(tag => ({
        label: tag.name,
        value: tag.id
      })),
      onChange: value => setAttributes({
        tag: value
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.SelectControl, {
      label: "Display Style",
      value: props.attributes.displayStyle,
      options: [{
        label: 'Default',
        value: 'default'
      }, {
        label: 'List',
        value: 'list'
      }, {
        label: 'Grid',
        value: 'grid'
      }],
      onChange: value => setAttributes({
        displayStyle: value
      })
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_edit__WEBPACK_IMPORTED_MODULE_3__["default"], props));
  }),
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_4__["default"]
});

/***/ }),

/***/ "./src/save.js":
/*!*********************!*\
  !*** ./src/save.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);

// import { RichText } from '@wordpress/block-editor';


const AbelDisplaySave = _ref => {
  let {
    attributes
  } = _ref;
  const {
    posts,
    displayStyle
  } = attributes;
  if (posts.length === 0) {
    return null;
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `abel-display-posts abel-display-style-${displayStyle}`
  }, posts && posts.length > 0 ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: "abel-wrapper"
  }, posts.map(post => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    key: post.id,
    className: "shape",
    href: post.link
  }, post.title.rendered))) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No posts found.')));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AbelDisplaySave);

/***/ }),

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

function abelDisplayAnimate() {
  startAnimation();
}

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ ((module) => {

module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"create-block/abel-display","version":"0.1.0","title":"Abel Display","category":"widgets","icon":"smiley","description":"Example block scaffolded with Create Block tool.","supports":{"html":false},"textdomain":"abel-display","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","attributes":{"category":{"type":"array","default":[]},"tag":{"type":"array","default":[]},"posts":{"type":"array","default":[]},"displayStyle":{"type":"string","default":"default"}}}');

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkabel_display"] = globalThis["webpackChunkabel_display"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map