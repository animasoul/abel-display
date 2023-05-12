import tingle from 'tingle.js';
import { __ } from '@wordpress/i18n';
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
	if ( animationPaused ) return;

	const shapes = document.querySelectorAll( '.shape' );
	const colors = [ 'red', 'blue', 'green', 'yellow', 'purple' ];
	const grid = [];
	const gridSize = 200; // Adjust this value based on your needs
	const container = document.querySelector( '.abel-wrapper' );
	const columns = Math.floor( container.offsetWidth / gridSize );
	const rows = Math.floor( container.offsetHeight / gridSize );

	for ( let i = 0; i < rows; i++ ) {
		for ( let j = 0; j < columns; j++ ) {
			grid.push( { top: i * gridSize, left: j * gridSize } );
		}
	}

	// Shuffle the grid array to randomize the order of the cells
	for ( let i = grid.length - 1; i > 0; i-- ) {
		const j = Math.floor( Math.random() * ( i + 1 ) );
		[ grid[ i ], grid[ j ] ] = [ grid[ j ], grid[ i ] ]; // Swap grid[i] and grid[j]
	}

	shapes.forEach( ( shape, index ) => {
		const initialColor = getRandomColor( colors );
		const initialColor2 = getRandomColor( colors );
		shape.style.backgroundImage = `radial-gradient(circle at center, ${ initialColor }, ${ initialColor2 })`;
		shape.style.borderColor = initialColor;

		const initialShape = getRandomShape();
		shape.style.borderRadius = [ 'circle', 'ellipse' ].includes(
			initialShape
		)
			? '50%'
			: '0';

		const gridBox = shape.parentElement.getBoundingClientRect();
		const width = Math.floor(
			gridBox.width * ( 0.15 + Math.random() * 0.15 )
		); // Limit shape size
		const height =
			initialShape === 'rectangle'
				? Math.floor( gridBox.height * ( 0.15 + Math.random() * 0.15 ) )
				: width;
		shape.style.width = `${ width }px`;
		shape.style.height = `${ height }px`;
		const position = grid[ index % grid.length ];
		shape.style.top = `${ position.top }px`;
		shape.style.left = `${ position.left }px`;

		const positionTransition =
			'top 1s ease-in-out 0s, left 1s ease-in-out 0s';
		shape.style.transition = positionTransition;

		shape.addEventListener( 'transitionend', function ( e ) {
			if ( e.propertyName !== 'top' ) return;

			setTimeout( () => {
				const positionTransition =
					'top 1s ease-in-out 0s, left 1s ease-in-out 0s';
				shape.style.transition = positionTransition;

				const animation = applyRandomAnimation( shape );
				shape.removeEventListener( 'mouseover', onMouseOver );
				shape.removeEventListener( 'mouseout', onMouseOut );
				shape.addEventListener( 'mouseover', onMouseOver );
				shape.addEventListener( 'mouseout', onMouseOut );
				shape.dataset.animation = animation;
			}, 1000 );

			setTimeout( () => {
				const colorTransition = `background-color 1s ease-in-out ${
					index * 100
				}ms, border-color 1s ease-in-out ${ index * 200 }ms`;
				const shapeTransition = `border-radius 1s ease-in-out ${
					index * 200
				}ms`;

				shape.style.transition = `${ colorTransition }, ${ shapeTransition }`;

				const color = getRandomColor( colors );
				shape.style.backgroundColor = color;
				shape.style.borderColor = color;

				const randomShape = getRandomShape();
				shape.style.borderRadius = [ 'circle', 'ellipse' ].includes(
					randomShape
				)
					? '50%'
					: '0';
			}, 1000 + index * 100 ); // Adding some delay for each shape
		} );
	} );
}

function resizeElements() {
	const shapes = document.querySelectorAll( '.shape' );
	const numberOfRows = Math.ceil( Math.sqrt( shapes.length ) ) * 2; // Increase grid size

	shapes.forEach( ( shape, index ) => {
		shape.style.gridColumn = `${ ( index % numberOfRows ) + 1 } / span 1`;
		shape.style.gridRow = `${
			Math.floor( index / numberOfRows ) + 1
		} / span 1`;
	} );
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
	  <img src="${ post.img_src }" alt="${ post.alt }" width="${
		post.width
	}" height="${ post.height }" loading="lazy" />
	  <a href="${ post.link }">${ __( 'Read more' ) }</a>
	` );

	// Open the modal
	modal.open();

	clearInterval( intervalId );
}
function startAnimation() {
	const wrapper = document.getElementsByClassName( 'abel-wrapper' );

	if ( wrapper !== null ) {
		try {
			changeColorAndShape();

			intervalId = setInterval( () => {
				if ( ! animationPaused ) changeColorAndShape();
			}, 5000 );
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
