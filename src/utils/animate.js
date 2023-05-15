import tingle from 'tingle.js';
import { __ } from '@wordpress/i18n';

// Utility functions
const rand = ( min, max ) =>
	Math.floor( Math.random() * ( max - min + 1 ) + min );

const uniqueRand = ( min, max, prev ) => {
	let next = prev;

	while ( prev === next ) next = rand( min, max );

	return next;
};

const combinations = [
	{ configuration: 1, roundness: 1 },
	{ configuration: 1, roundness: 2 },
	{ configuration: 1, roundness: 4 },
	{ configuration: 2, roundness: 2 },
	{ configuration: 2, roundness: 3 },
	{ configuration: 3, roundness: 3 },
];

let prev = 0;
let intervalId;
// Start the animation
const startAnimation = ( wrappers ) => {
	// If the interval is already set, do nothing
	if ( intervalId !== undefined ) return;
	intervalId = setInterval( () => {
		wrappers.forEach( ( wrapper ) => {
			const index = uniqueRand( 0, combinations.length - 1, prev ),
				combination = combinations[ index ];

			wrapper.dataset.configuration = combination.configuration;
			wrapper.dataset.roundness = combination.roundness;

			prev = index;
		} );
	}, 3000 );
};

let activeShape = null; // Add this global variable
let modal;

function openModal( shape ) {
	if ( ! shape.dataset ) return;

	const post = JSON.parse( shape.dataset.post );

	// Update the activeShape reference
	activeShape = shape;
	activeShape.style.animation = 'none';

	// Create a new tingle modal
	if ( ! modal ) {
		modal = new tingle.modal( {
			footer: false,
			stickyFooter: false,
			closeMethods: [ 'overlay', 'button', 'escape' ],
			closeLabel: 'Close',
			cssClass: [ 'custom-class-1', 'custom-class-2' ],
			onOpen: () => {},
			onClose: () => {
				if ( activeShape ) {
					activeShape.style.animationPlayState = 'running';
					activeShape = null; // Clear the reference
				}
			},
		} );
	}

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
}

function attachEventsToShapes( wrapper ) {
	const shapes = wrapper.querySelectorAll( '.shape' );

	shapes.forEach( ( shape ) => {
		// Open the modal when the shape is clicked
		shape.addEventListener( 'click', ( e ) => {
			e.preventDefault(); // Prevent the link from being followed
			openModal( shape );
		} );

		// Pause the animation when the shape is hovered
		shape.addEventListener( 'mouseover', () => {
			shape.style.animationPlayState = 'paused';
		} );

		// Resume the animation when the mouse leaves the shape
		shape.addEventListener( 'mouseout', () => {
			shape.style.animationPlayState = 'running';
		} );
	} );
}

// Define a function to start the animation on your wrappers
function startAnimationOnWrappers( wrappers ) {
	startAnimation( wrappers );
}

// Create a new MutationObserver instance
const observer = new MutationObserver( ( mutationsList, observer ) => {
	// Look through all mutations that just occured
	for ( let mutation of mutationsList ) {
		// If the addedNodes property has one or more nodes
		if ( mutation.addedNodes.length ) {
			const newWrappers = document.querySelectorAll( '.abel-wrapper' ); // Change variable name here

			newWrappers.forEach( ( wrapper ) => {
				attachEventsToShapes( wrapper );
				startAnimationOnWrappers( newWrappers ); // And here
			} );
		}
	}
} );

document.addEventListener( 'DOMContentLoaded', ( event ) => {
	// Start observing the document with the configured parameters
	observer.observe( document.body, { childList: true, subtree: true } );
} );
