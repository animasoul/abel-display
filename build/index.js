/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
/* harmony import */ var _utils_animate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/animate */ "./src/utils/animate.js");
/* harmony import */ var _utils_getFeaturedOrFirstImage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/getFeaturedOrFirstImage */ "./src/utils/getFeaturedOrFirstImage.js");









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
      (0,_utils_animate__WEBPACK_IMPORTED_MODULE_6__["default"])();
    }
  }
  render() {
    const {
      category,
      tag,
      posts,
      displayStyle,
      imageSize
    } = this.props.attributes;
    if (!posts || posts.length === 0) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "abel-wrapper"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('No posts found. Please select some categories and tags.')));
    }
    // console.log("posts: ".post);
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: 'abel-display-posts abel-display-style-' + displayStyle
    }, posts && posts.length > 0 ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "abel-wrapper"
    }, posts.map(post => {
      const featuredImage = (0,_utils_getFeaturedOrFirstImage__WEBPACK_IMPORTED_MODULE_7__.getFeaturedOrFirstImage)(post, imageSize);
      if (featuredImage && !featuredImage.alt) {
        featuredImage.alt = post.title.rendered;
      }
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
        className: "shape",
        href: post.link,
        key: post.id,
        "data-post": JSON.stringify({
          id: post.id,
          title: post.title.rendered,
          link: post.link,
          img_src: featuredImage ? featuredImage.url : '',
          alt: featuredImage.alt,
          width: featuredImage.width,
          height: featuredImage.height
        })
      }, post.title.rendered);
    })) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "abel-wrapper"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('No posts found.'))));
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__.compose)([(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.withSelect)((select, props) => {
  const {
    getEntityRecords
  } = select('core');
  const {
    category,
    tag,
    numberposts
  } = props.attributes;
  let postsQuery = {
    per_page: numberposts,
    status: 'publish',
    _embed: true,
    _fields: 'id,link,title.rendered,content.rendered,_links,_embedded.wp:featuredmedia'
  };
  if (category && category.length) {
    postsQuery.categories = category.join();
  }
  if (tag && tag.length) {
    postsQuery.tags = tag.join();
  }

  // console.log( 'Posts query: ', postsQuery ); // Debug line

  const posts = getEntityRecords('postType', 'post', postsQuery);

  // console.log( 'Posts response: ', posts ); // Debug line

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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./save */ "./src/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./block.json */ "./src/block.json");
/* harmony import */ var _utils_useImageSizes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/useImageSizes */ "./src/utils/useImageSizes.js");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_9__);




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
const withCategoriesAndTags = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_9__.withSelect)(select => {
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
    },
    imageSize: {
      type: 'string',
      default: 'medium'
    },
    numberposts: {
      type: 'number',
      default: 5
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
    const imageSizes = (0,_utils_useImageSizes__WEBPACK_IMPORTED_MODULE_6__["default"])();
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_8__.PanelBody, {
      title: "Filter Posts"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_8__.SelectControl, {
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
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_8__.SelectControl, {
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
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_8__.RangeControl, {
      label: 'Number of posts to display',
      value: props.attributes.numberposts,
      onChange: value => setAttributes({
        numberposts: value
      }),
      min: 1,
      max: 20
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_8__.SelectControl, {
      label: "Image Size",
      value: props.attributes.imageSize,
      options: imageSizes && imageSizes.length > 0 ? imageSizes.map(size => ({
        label: size,
        value: size
      })) : [],
      onChange: value => setAttributes({
        imageSize: value
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_8__.SelectControl, {
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_getFeaturedOrFirstImage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/getFeaturedOrFirstImage */ "./src/utils/getFeaturedOrFirstImage.js");




const AbelDisplaySave = _ref => {
  let {
    attributes
  } = _ref;
  const {
    posts,
    displayStyle,
    imageSize
  } = attributes;
  if (posts.length === 0) {
    return null;
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `abel-display-posts abel-display-style-${displayStyle}`
  }, posts && posts.length > 0 ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "abel-wrapper"
  }, posts.map(post => {
    const featuredImage = (0,_utils_getFeaturedOrFirstImage__WEBPACK_IMPORTED_MODULE_2__.getFeaturedOrFirstImage)(post, imageSize);
    if (featuredImage && !featuredImage.alt) {
      featuredImage.alt = post.title.rendered;
    }
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      key: post.id,
      className: "shape",
      href: post.link,
      "data-post": JSON.stringify({
        id: post.id,
        title: post.title.rendered,
        link: post.link,
        img_src: featuredImage ? featuredImage.url : '',
        alt: featuredImage.alt,
        width: featuredImage.width,
        height: featuredImage.height
      })
    }, post.title.rendered);
  })) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "abel-wrapper"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No posts found.'))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AbelDisplaySave);

/***/ }),

/***/ "./src/utils/animate.js":
/*!******************************!*\
  !*** ./src/utils/animate.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ }),

/***/ "./src/utils/getFeaturedOrFirstImage.js":
/*!**********************************************!*\
  !*** ./src/utils/getFeaturedOrFirstImage.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getFeaturedOrFirstImage": () => (/* binding */ getFeaturedOrFirstImage)
/* harmony export */ });
const getFeaturedOrFirstImage = (post, imageSize) => {
  if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0].media_details && post._embedded['wp:featuredmedia'][0].media_details.sizes) {
    const sizes = post._embedded['wp:featuredmedia'][0].media_details.sizes;
    let image = sizes[imageSize];

    // If the desired image size doesn't exist, fall back to 'full'.
    if (!image && sizes['full']) {
      image = sizes['full'];
    }

    // If 'full' size doesn't exist, fall back to the first available size.
    if (!image) {
      const availableSizes = Object.values(sizes);
      image = availableSizes[0];
    }
    if (image) {
      return {
        url: image.source_url,
        width: image.width,
        height: image.height,
        alt: post._embedded['wp:featuredmedia'][0].alt_text
      };
    }
  }
  const content = post.content ? post.content.rendered : null;
  const imgRegex = /<img[^>]+src="(http:\/\/[^">]+|https:\/\/[^">]+)"/g;
  const match = imgRegex.exec(content);
  if (match && match[1]) {
    return {
      url: match[1],
      width: null,
      height: null,
      alt: null
    };
  }
  return null;
};

/***/ }),

/***/ "./src/utils/useImageSizes.js":
/*!************************************!*\
  !*** ./src/utils/useImageSizes.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const useImageSizes = () => {
  const [imageSizes, setImageSizes] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (window.wpImageSizes) {
      setImageSizes(Object.keys(window.wpImageSizes));
    } else {
      setImageSizes([]);
    }
  }, []);
  return imageSizes;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useImageSizes);

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

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

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"create-block/abel-display","version":"0.1.0","title":"Abel Display","category":"widgets","icon":"smiley","description":"Example block scaffolded with Create Block tool.","supports":{"html":false},"textdomain":"abel-display","script":"file:./utils/animate.js","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","attributes":{"category":{"type":"array","default":[]},"tag":{"type":"array","default":[]},"posts":{"type":"array","default":[]},"displayStyle":{"type":"string","default":"default"},"numberposts":{"type":"number","default":5}}}');

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