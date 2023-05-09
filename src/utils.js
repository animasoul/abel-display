export const getFeaturedOrFirstImage = ( post, imageSize ) => {
	if (
		post._embedded &&
		post._embedded[ 'wp:featuredmedia' ] &&
		post._embedded[ 'wp:featuredmedia' ][ 0 ].media_details &&
		post._embedded[ 'wp:featuredmedia' ][ 0 ].media_details.sizes[
			imageSize
		]
	) {
		const image =
			post._embedded[ 'wp:featuredmedia' ][ 0 ].media_details.sizes[
				imageSize
			];
		return {
			url: image.source_url,
			width: image.width,
			height: image.height,
			alt: post._embedded[ 'wp:featuredmedia' ][ 0 ].alt_text,
		};
	}

	const content = post.content ? post.content.rendered : null;
	const imgRegex = /<img[^>]+src="(http:\/\/[^">]+|https:\/\/[^">]+)"/g;
	const match = imgRegex.exec( content );
	if ( match && match[ 1 ] ) {
		return { url: match[ 1 ], width: null, height: null, alt: null };
	}

	return null;
};
