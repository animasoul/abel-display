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
				<div id="abel-wrapper">
					{ posts.map( ( post ) => {
						const featuredImage = getFeaturedOrFirstImage(
							post,
							imageSize
						);
						if ( featuredImage && ! featuredImage.alt ) {
							featuredImage.alt = post.title.rendered;
						}
						return (
							<a
								key={ post.id }
								className="shape"
								href={ post.link }
							>
								{ featuredImage && (
									<img
										src={ featuredImage.url }
										width={ featuredImage.width }
										height={ featuredImage.height }
										alt={ featuredImage.alt }
										loading="lazy"
									/>
								) }
								{ post.title.rendered }
							</a>
						);
					} ) }
				</div>
			) : (
				<Fragment>{ __( `No posts found.` ) }</Fragment>
			) }
		</div>
	);
};

export default AbelDisplaySave;
