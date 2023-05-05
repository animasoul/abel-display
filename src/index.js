/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { withSelect } from '@wordpress/data';

/**
 * This function is a Higher Order Component that wraps the original block edit component.
 * It provides additional props to the wrapped component, which include the categories and tags
 * from the WordPress REST API.
 *
 * @param {Function} OriginalEdit The original edit component to wrap.
 * @return {Function} The wrapped edit component.
 */
const withCategoriesAndTags = withSelect( ( select ) => {
	const { getEntityRecords } = select( 'core' );

	return {
		categories: getEntityRecords( 'taxonomy', 'category', {
			per_page: -1,
		} ),
		tags: getEntityRecords( 'taxonomy', 'post_tag', { per_page: -1 } ),
	};
} );

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	/**
	 * Define block attributes.
	 */
	attributes: {
		category: {
			type: 'array',
			default: [],
		},
		tag: {
			type: 'array',
			default: [],
		},
		posts: {
			type: 'array',
			default: [],
		},
		displayStyle: {
			type: 'string',
			default: 'default',
		},
	},

	/**
	 * @see ./edit.js
	 */
	edit: withCategoriesAndTags( ( props ) => {
		const { categories, tags, setAttributes } = props;

		if ( ! categories || ! tags ) {
			return 'Loading...';
		}

		return (
			<>
				<InspectorControls>
					<PanelBody title="Filter Posts">
						<SelectControl
							label="Category"
							multiple={ true }
							value={ props.attributes.category }
							options={ categories.map( ( category ) => ( {
								label: category.name,
								value: category.id,
							} ) ) }
							onChange={ ( value ) =>
								setAttributes( { category: value } )
							}
						/>
						<SelectControl
							label="Tag"
							multiple={ true }
							value={ props.attributes.tag }
							options={ tags.map( ( tag ) => ( {
								label: tag.name,
								value: tag.id,
							} ) ) }
							onChange={ ( value ) =>
								setAttributes( { tag: value } )
							}
						/>
						<SelectControl
							label="Display Style"
							value={ props.attributes.displayStyle }
							options={ [
								{ label: 'Default', value: 'default' },
								{ label: 'List', value: 'list' },
								{ label: 'Grid', value: 'grid' },
							] }
							onChange={ ( value ) =>
								setAttributes( { displayStyle: value } )
							}
						/>
					</PanelBody>
				</InspectorControls>
				<Edit { ...props } />
			</>
		);
	} ),

	/**
	 * @see ./save.js
	 */
	save,
} );
