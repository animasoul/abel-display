import '@testing-library/jest-dom';


global.fetch = jest.fn( ( url ) => {
	let data;

	if ( url.includes( '/wp/v2/categories' ) ) {
		data = [
			/* Mock category data here */
		];
	} else if ( url.includes( '/wp/v2/tags' ) ) {
		data = [
			/* Mock tag data here */
		];
	} else if ( url.includes( '/wp/v2/posts' ) ) {
		data = [
			/* Mock post data here */
		];
	}

	return Promise.resolve( {
		ok: true,
		json: () => Promise.resolve( data ),
	} );
} );
