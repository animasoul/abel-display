import { useState, useEffect } from '@wordpress/element';

const useImageSizes = () => {
	const [ imageSizes, setImageSizes ] = useState( [] );

	useEffect( () => {
		if ( window.wpImageSizes ) {
			setImageSizes( Object.keys( window.wpImageSizes ) );
		} else {
			setImageSizes( [] );
		}
	}, [] );
	return imageSizes;
};
export default useImageSizes;
