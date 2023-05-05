export default function abelDisplayAnimate() {
	document.addEventListener( 'DOMContentLoaded', () => {
		const wrapper = document.getElementById( 'abel-wrapper' );
		if ( wrapper !== null ) {
			try {
				function debounce( func, wait ) {
					let timeout;
					return function executedFunction( ...args ) {
						const later = () => {
							clearTimeout( timeout );
							func( ...args );
						};
						clearTimeout( timeout );
						timeout = setTimeout( later, wait );
					};
				}

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
						selectedAnimation =
							animations[ getRandomInt( animations.length ) ];
					} while ( selectedAnimation === currentAnimation );

					if ( selectedAnimation === 'rotation' ) {
						shape.style.animation = `rotate ${
							3 + getRandomInt( 4 )
						}s linear infinite`;
					} else if ( selectedAnimation === 'scale' ) {
						shape.style.animation = `scale ${
							3 + getRandomInt( 4 )
						}s linear infinite`;
					} else if ( selectedAnimation === 'skew' ) {
						shape.style.animation = `skew ${
							3 + getRandomInt( 4 )
						}s linear infinite`;
					}

					return selectedAnimation;
				}

				function changeColorAndShape() {
					const shapes = document.querySelectorAll( '.shape' );
					const colors = [
						'red',
						'blue',
						'green',
						'yellow',
						'purple',
					];

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

						// Calculate the size based on the grid cell's dimensions
						const gridSize =
							shape.parentElement.getBoundingClientRect();
						const width = Math.floor(
							gridSize.width * ( 0.5 + Math.random() * 0.5 )
						);
						const height =
							randomShape === 'rectangle'
								? Math.floor(
										gridSize.height *
											( 0.5 + Math.random() * 0.5 )
								  )
								: width;
						shape.style.width = `${ width }px`;
						shape.style.height = `${ height }px`;
						const animation = applyRandomAnimation( shape );
						shape.dataset.animation = animation;
					} );
				}

				function resizeElements() {
					const shapes = document.querySelectorAll( '.shape' );

					const numberOfRows = Math.ceil(
						Math.sqrt( shapes.length )
					);

					shapes.forEach( ( shape, index ) => {
						shape.style.gridColumn = `${
							( index % numberOfRows ) + 1
						} / span 1`;
						shape.style.gridRow = `${
							Math.floor( index / numberOfRows ) + 1
						} / span 1`;
					} );
				}
				// Call the changeColorAndShape function immediately
				changeColorAndShape();

				// Then set the interval
				let intervalId = setInterval(
					debounce( changeColorAndShape, 100 ),
					3000
				);

				const shapeElements = document.querySelectorAll( '.shape' );
				shapeElements.forEach( ( shape ) => {
					shape.addEventListener( 'mouseover', () => {
						clearInterval( intervalId );
						shape.style.animationPlayState = 'paused';
					} );

					shape.addEventListener( 'mouseout', () => {
						intervalId = setInterval( changeColorAndShape, 3000 );
						shape.style.animationPlayState = 'running';
					} );
				} );

				window.addEventListener( 'load', resizeElements );
				window.addEventListener( 'resize', resizeElements );
			} catch ( error ) {
				console.error(
					'An error occurred while executing the script:',
					error
				);
			}
		}
	} );
}
