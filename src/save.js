// import { RichText } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

const AbelDisplaySave = ( { attributes } ) => {
	const { posts, displayStyle } = attributes;

	if ( posts.length === 0 ) {
		return null;
	}

	return (
		<div
			className={ `abel-display-posts abel-display-style-${ displayStyle }` }
		>
			{ posts && posts.length > 0 ? (
				<div id="abel-wrapper">
					{ posts.map( ( post ) => (
						<a key={ post.id } className="shape" href={ post.link }>
							{ post.title.rendered }
						</a>
					) ) }
				</div>
			) : (
				<Fragment>{ __( 'No posts found.' ) }</Fragment>
			) }
			{ /* <script type="text/javascript">
			{`document.addEventListener('DOMContentLoaded', function() { 
				abelDisplayFunction(); 
			}, false);`}
			

			</script> */ }
		</div>
	);
};

export default AbelDisplaySave;
