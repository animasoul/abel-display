import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { getFeaturedOrFirstImage } from './utils/getFeaturedOrFirstImage';

const AbelDisplaySave = ( { attributes } ) => {
	const { posts, displayStyle, imageSize } = attributes;

	if ( posts.length === 0 ) {
		return null;
	}

	return (
		<div
			className={ `abel-display-posts abel-display-style-${ displayStyle }` }
		>
			{ posts && posts.length > 0 ? (
				<div
					className="abel-wrapper"
					data-configuration="1"
					data-roundness="1"
				>
					{ posts.map( ( post ) => {
						const featuredImage = getFeaturedOrFirstImage(
							post,
							imageSize
						);
						if ( featuredImage && ! featuredImage.alt ) {
							featuredImage.alt = post.title.rendered;
						}
						return (
							<div className="shape" key={ post.id }>
								<dialog>
									<h2>{ post.title.rendered }</h2>
									<img
										src={ featuredImage.url }
										alt={ featuredImage.alt }
										width={ featuredImage.width }
										height={ featuredImage.height }
										loading="lazy"
									/>
									<div
										dangerouslySetInnerHTML={ {
											__html: post.content.rendered,
										} }
									/>
									<button className="close-button">
										{ __( 'Close' ) }
									</button>
								</dialog>
								{ post.title.rendered }
							</div>
						);
					} ) }
				</div>
			) : (
				<Fragment>
					<div className="abel-wrapper">
						{ __( 'No posts found.' ) }
					</div>
				</Fragment>
			) }
		</div>
	);
};

export default AbelDisplaySave;
