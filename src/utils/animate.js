import tingle from 'tingle.js';
// Utility functions
function getRandomInt( max ) {
	return Math.floor( Math.random() * max );
}

function getRandomColor( colors, currentColor ) {
	let newColor;
	do {
		newColor = colors[ getRandomInt( colors.length ) ];
	} while ( newColor === currentColor );
	return newColor;
}

function getRandomShape( currentShape ) {
	const shapes = [
		'circle',
		'square',
		'rectangle',
		'ellipse',
		'triangle',
		'pentagon',
		'hexagon',
	];
	let newShape;
	do {
		newShape = shapes[ getRandomInt( shapes.length ) ];
	} while ( newShape === currentShape );
	return newShape;
}

function applyRandomAnimation( shape, currentAnimation ) {
	const animations = [ 'rotation', 'scale', 'skew' ];
	let selectedAnimation;
	do {
		selectedAnimation = animations[ getRandomInt( animations.length ) ];
	} while ( selectedAnimation === currentAnimation );

	if ( selectedAnimation === 'rotation' ) {
		shape.style.animation = `rotate ${
			5 + getRandomInt( 5 )
		}s linear infinite`;
	} else if ( selectedAnimation === 'scale' ) {
		shape.style.animation = `scale ${
			5 + getRandomInt( 5 )
		}s linear infinite`;
	} else if ( selectedAnimation === 'skew' ) {
		shape.style.animation = `skew ${
			5 + getRandomInt( 5 )
		}s linear infinite`;
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
	const shapes = document.querySelectorAll( '.shape' );
	const colors = [ 'red', 'blue', 'green', 'yellow', 'purple' ];

	shapes.forEach( ( shape ) => {
		const color = getRandomColor( colors );
		shape.style.backgroundColor = color;
		shape.style.borderColor = color;

		const randomShape = getRandomShape();
		if ( randomShape === 'circle' ) {
			shape.style.borderRadius = '50%';
		} else if ( randomShape === 'square' ) {
			shape.style.borderRadius = '0';
		} else if ( randomShape === 'rectangle' ) {
			shape.style.borderRadius = '0';
		} else if ( randomShape === 'ellipse' ) {
			shape.style.borderRadius = '50%';
		}

		const gridSize = shape.parentElement.getBoundingClientRect();
		const width = Math.floor(
			gridSize.width * ( 0.5 + Math.random() * 0.5 )
		);
		const height =
			randomShape === 'rectangle'
				? Math.floor( gridSize.height * ( 0.5 + Math.random() * 0.5 ) )
				: width;
		shape.style.width = `${ width }px`;
		shape.style.height = `${ height }px`;
		const animation = applyRandomAnimation( shape );
		shape.removeEventListener( 'mouseover', onMouseOver );
		shape.removeEventListener( 'mouseout', onMouseOut );
		shape.addEventListener( 'mouseover', onMouseOver );
		shape.addEventListener( 'mouseout', onMouseOut );
		shape.dataset.animation = animation;
	} );
}

function resizeElements() {
	const shapes = document.querySelectorAll( '.shape' );
	const numberOfRows = Math.ceil( Math.sqrt( shapes.length ) );

	shapes.forEach( ( shape, index ) => {
		shape.style.gridColumn = `${ ( index % numberOfRows ) + 1 } / span 1`;
		shape.style.gridRow = `${
			Math.floor( index / numberOfRows ) + 1
		} / span 1`;
	} );
}
let intervalId;
// Event listeners
function onMouseOver() {
	clearInterval( intervalId );
	this.style.animationPlayState = 'paused';
}

function onMouseOut() {
	intervalId = setInterval( changeColorAndShape, 3000 );
	this.style.animationPlayState = 'running';
}

// Main functions
function expandShape( shape ) {
	if ( ! shape.dataset ) return;

	const post = JSON.parse( shape.dataset.post );

	// Disable animations when the shape is expanded
	shape.style.animation = 'none';

	// Create a new tingle modal
	const modal = new tingle.modal( {
		footer: false,
		stickyFooter: false,
		closeMethods: [ 'overlay', 'button', 'escape' ],
		closeLabel: 'Close',
		cssClass: [ 'custom-class-1', 'custom-class-2' ],
		onOpen: () => {},
		onClose: () => {
			shape.style.animation = '';
		},
	} );

	// Set the modal content
	modal.setContent( `
	  <h2>${ post.title }</h2>
	  <img src="${ post.img_src }" alt="${ post.alt }" width="${ post.width }" height="${ post.height }">
	  <a href="${ post.link }">Read more</a>
	` );

	// Open the modal
	modal.open();

	clearInterval( intervalId );
}
function startAnimation() {
	const wrapper = document.getElementById( 'abel-wrapper' );

	if ( wrapper !== null ) {
		try {
			changeColorAndShape();
			resizeElements();

			const shapeElements = document.querySelectorAll( '.shape' );
			shapeElements.forEach( ( shape ) => {
				shape.removeEventListener( 'click', onShapeClick );
				shape.addEventListener( 'click', onShapeClick );
			} );

			window.addEventListener( 'load', resizeElements );
			window.addEventListener( 'resize', resizeElements );
		} catch ( error ) {
			// eslint-disable-next-line no-console
			console.error(
				'An error occurred while executing the script:',
				error
			);
		}
	}
}
function onShapeClick( e ) {
	e.preventDefault();
	expandShape( this, true );
}

// Initialize the animations
document.addEventListener( 'DOMContentLoaded', () => {
	if ( ! document.body.classList.contains( 'wp-admin' ) ) {
		startAnimation();
	}
} );

export default function abelDisplayAnimate() {
	startAnimation();
}
