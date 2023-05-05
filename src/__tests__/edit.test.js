import { render, screen } from '@testing-library/react';
import apiFetch from '@wordpress/api-fetch';
import Edit from '../edit';

jest.mock( '@wordpress/api-fetch' );

const WrapperComponent = ( props ) => {
	const attributes = {
		category: '',
		tag: '',
		posts: '',
		displayStyle: '',
		...props,
	};

	const setAttributes = jest.fn();

	return <Edit attributes={ attributes } setAttributes={ setAttributes } />;
};

apiFetch.mockImplementation( ( request ) => {
	if ( request.path.startsWith( '/wp/v2/categories' ) ) {
		return Promise.resolve( {
			json: () => Promise.resolve( [ { id: 1, name: 'Category 1' } ] ),
		} );
	}

	if ( request.path.startsWith( '/wp/v2/tags' ) ) {
		return Promise.resolve( {
			json: () => Promise.resolve( [ { id: 2, name: 'Tag 1' } ] ),
		} );
	}

	if ( request.path.startsWith( '/wp/v2/posts' ) ) {
		return Promise.resolve( {
			json: () =>
				Promise.resolve( [
					{
						id: 3,
						title: { rendered: 'Post 1' },
						content: { rendered: 'Post content 1' },
					},
				] ),
		} );
	}

	return Promise.reject( 'Unknown API request' );
} );

describe( 'Edit component', () => {
	test( 'should render without crashing', () => {
		const { getByText } = render( <WrapperComponent /> );
		expect( getByText( 'Loading...' ) ).toBeInTheDocument();

		render( <WrapperComponent /> );
	} );
	// Test 1: Check if the component displays the correct message when category or tag is empty.
	test( 'should display "Loading..." message when category or tag is empty', () => {
		render( <WrapperComponent /> );
		expect( screen.getByText( /Loading.../ ) ).toBeInTheDocument();
	} );

	// Test 2: Check if the component displays "No posts found." message when there are no posts.
	test( 'should display "No posts found." when there are no posts', () => {
		render( <WrapperComponent category="1" tag="1" /> );
		expect( screen.getByText( /No posts found./ ) ).toBeInTheDocument();
	} );

	// Test 3: Check if the component renders the correct posts based on the attributes.
	test( 'should render correct posts based on attributes', () => {
		const examplePosts = [
			{
				id: 1,
				link: 'https://example.com/post-1',
				title: { rendered: 'Post 1' },
			},
			{
				id: 2,
				link: 'https://example.com/post-2',
				title: { rendered: 'Post 2' },
			},
		];
		render(
			<WrapperComponent
				category="1"
				tag="1"
				posts={ examplePosts }
				displayStyle="grid"
			/>
		);

		expect( screen.getByText( 'Post 1' ) ).toBeInTheDocument();
		expect( screen.getByText( 'Post 2' ) ).toBeInTheDocument();
	} );
} );
