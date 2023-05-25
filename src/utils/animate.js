// Function to generate a unique random number in a range
// Returns a random value between min and max, excluding prev
const uniqueRand = ( min, max, prev ) => {
	let next = prev;
	while ( prev === next )
		next = Math.floor( Math.random() * ( max - min + 1 ) + min );
	return next;
};

// All possible combinations of configuration and roundness
const combinations = [
	{ configuration: 1, roundness: 1 },
	{ configuration: 1, roundness: 2 },
	{ configuration: 1, roundness: 4 },
	{ configuration: 2, roundness: 2 },
	{ configuration: 2, roundness: 3 },
	{ configuration: 3, roundness: 3 },
];

// Previous value of the random number
let prev = 0;

// Id of the interval
let intervalId;

// Function to start the animation
const startAnimation = ( wrappers ) => {
	if ( intervalId !== undefined ) return;
	intervalId = setInterval( () => {
		wrappers.forEach( ( wrapper ) => {
			// Get a random number between 0 and the number of combinations
			const index = uniqueRand( 0, combinations.length - 1, prev ),
				// Destructure the combination object
				{ configuration, roundness } = combinations[ index ];

			wrapper.dataset.configuration = configuration;
			wrapper.dataset.roundness = roundness;

			prev = index;

			// Add mouseover and mouseout event listeners
			wrapper.addEventListener( 'mouseover', () => {
				clearInterval( intervalId );
				intervalId = undefined;
			} );

			wrapper.addEventListener( 'mouseout', () => {
				startAnimation( [ wrapper ] );
			} );
		} );
	}, 3000 );
};

// Define a function to start the animation on your wrappers
function startAnimationOnWrappers( wrappers ) {
	startAnimation( wrappers );
}

// Create a new MutationObserver instance
const observer = new MutationObserver( ( mutationsList ) => {
	// Loop over the list of mutations
	for ( const mutation of mutationsList ) {
		// If nodes were added
		if ( mutation.addedNodes.length ) {
			// Get the newly added wrappers and shapes
			const newWrappers = document.querySelectorAll( '.abel-wrapper' ),
				shapes = document.querySelectorAll( '.shape' );

			// Start animation on wrappers
			newWrappers.forEach( () => {
				startAnimationOnWrappers( newWrappers );
			} );

			// Attach events to shapes
			shapes.forEach( ( shape ) => {
				// If events have not already been attached
				if ( ! shape.dataset.eventAttached ) {
					// Attach events
					const dialog = shape.querySelector( 'dialog' );

					shape.addEventListener( 'click', () => {
						if ( dialog.open ) dialog.close();
						else dialog.showModal();
					} );

					const closeButton = dialog.querySelector( '.close-button' );
					closeButton.addEventListener( 'click', ( event ) => {
						event.stopPropagation();
						dialog.close();
					} );

					// Remember that events have been attached
					shape.dataset.eventAttached = true;
				}
			} );
		}
	}
} );

document.addEventListener( 'DOMContentLoaded', () => {
	observer.observe( document.body, { childList: true, subtree: true } );
} );
