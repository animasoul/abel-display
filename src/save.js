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
							<a
								key={ post.id }
								className="shape"
								href={ post.link }
								data-post={ JSON.stringify( {
									id: post.id,
									title: post.title.rendered,
									link: post.link,
									img_src: featuredImage
										? featuredImage.url
										: '',
									alt: featuredImage.alt,
									width: featuredImage.width,
									height: featuredImage.height,
								} ) }
							>
								{ /* { featuredImage && (
									<img
										src={ featuredImage.url }
										width={ featuredImage.width }
										height={ featuredImage.height }
										alt={ featuredImage.alt }
										loading="lazy"
									/>
								) } */ }
								{ post.title.rendered }
							</a>
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
