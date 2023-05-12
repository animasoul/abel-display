export const getFeaturedOrFirstImage = ( post, imageSize ) => {
	if (
		post._embedded &&
		post._embedded[ 'wp:featuredmedia' ] &&
		post._embedded[ 'wp:featuredmedia' ][ 0 ].media_details &&
		post._embedded[ 'wp:featuredmedia' ][ 0 ].media_details.sizes
	) {
		const sizes =
			post._embedded[ 'wp:featuredmedia' ][ 0 ].media_details.sizes;
		let image = sizes[ imageSize ];

		// If the desired image size doesn't exist, fall back to 'full'.
		if ( ! image && sizes[ 'full' ] ) {
			image = sizes[ 'full' ];
		}

		// If 'full' size doesn't exist, fall back to the first available size.
		if ( ! image ) {
			const availableSizes = Object.values( sizes );
			image = availableSizes[ 0 ];
		}

		if ( image ) {
			return {
				url: image.source_url,
				width: image.width,
				height: image.height,
				alt: post._embedded[ 'wp:featuredmedia' ][ 0 ].alt_text,
			};
		}
	}

	const content = post.content ? post.content.rendered : null;
	const imgRegex = /<img[^>]+src="(http:\/\/[^">]+|https:\/\/[^">]+)"/g;
	const match = imgRegex.exec( content );
	if ( match && match[ 1 ] ) {
		return { url: match[ 1 ], width: null, height: null, alt: null };
	}

	return null;
};
