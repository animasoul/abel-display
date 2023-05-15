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

// Start the animation
let startAnimation = ( wrappers ) => {
	setInterval( () => {
		wrappers.forEach( ( wrapper ) => {
			const index = uniqueRand( 0, combinations.length - 1, prev ),
				combination = combinations[ index ];

			wrapper.dataset.configuration = combination.configuration;
			wrapper.dataset.roundness = combination.roundness;

			prev = index;
		} );
	}, 3000 );
};
function openModal( shape ) {
	if ( ! shape.dataset ) return;

	const post = JSON.parse( shape.dataset.post );

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
}
document.addEventListener( 'DOMContentLoaded', () => {
	let wrappers = document.querySelectorAll( '.abel-wrapper' );

	wrappers.forEach( ( wrapper ) => {
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
	} );

	if ( ! document.body.classList.contains( 'wp-admin' ) ) {
		startAnimation( wrappers );
	}
} );
export default function abelDisplayAnimate() {
	let wrappers = document.querySelectorAll( '.abel-wrapper' );
	startAnimation( wrappers );
}
