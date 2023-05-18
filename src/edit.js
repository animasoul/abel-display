import { withColors } from '@wordpress/block-editor';
import { withSelect } from '@wordpress/data';
import { Fragment, Component } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import { getFeaturedOrFirstImage } from './utils/getFeaturedOrFirstImage';

class AbelDisplayEdit extends Component {
	constructor() {
		super( ...arguments );
		this.handleCategoryChange = this.handleCategoryChange.bind( this );
		this.handleTagChange = this.handleTagChange.bind( this );
		this.handleDisplayStyleChange =
			this.handleDisplayStyleChange.bind( this );
	}
	handleCategoryChange = ( selectedCategories ) => {
		const categoryIds = selectedCategories.map(
			( category ) => category.value
		);
		this.props.setAttributes( { category: categoryIds } );
	};

	handleTagChange = ( tags ) => {
		this.props.setAttributes( { tags } );
	};

	handleDisplayStyleChange = ( displayStyle ) => {
		this.props.setAttributes( { displayStyle } );
	};

	componentDidMount() {
		const { categories, tags, setAttributes } = this.props;

		if ( ! categories ) {
			apiFetch( { path: '/wp/v2/categories?_fields=id,name' } )
				.then( ( response ) => response.json() )
				.then( ( fetchedCategories ) => {
					setAttributes( { fetchedCategories } );
				} );
		}

		if ( ! tags ) {
			apiFetch( { path: '/wp/v2/tags?_fields=id,name' } )
				.then( ( response ) => response.json() )
				.then( ( fetchedTags ) => {
					setAttributes( { fetchedTags } );
				} );
		}
	}

	componentDidUpdate( prevProps ) {
		const { posts, setAttributes } = this.props;

		if ( posts !== prevProps.posts ) {
			setAttributes( { posts } );
		}
	}

	render() {
		const { posts, displayStyle, imageSize } = this.props.attributes;

		if ( ! posts || posts.length === 0 ) {
			return (
				<Fragment>
					<div className="abel-wrapper">
						{ __(
							'No posts found. Please select some categories and tags.'
						) }
					</div>
				</Fragment>
			);
		}

		return (
			<div
				className={
					'abel-display-posts abel-display-style-' + displayStyle
				}
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
									<p>
										{ post.title.rendered.length > 5
											? post.title.rendered.substring(
													0,
													5
											  )
											: post.title.rendered }
									</p>
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
	}
}

export default compose( [
	withSelect( ( select, props ) => {
		const { getEntityRecords } = select( 'core' );
		const { category, tag, numberposts } = props.attributes;

		const postsQuery = {
			per_page: numberposts,
			status: 'publish',
			_embed: true,
			_fields:
				'id,link,title.rendered,content.rendered,_links,_embedded.wp:featuredmedia',
		};

		if ( category && category.length ) {
			postsQuery.categories = category.join();
		}

		if ( tag && tag.length ) {
			postsQuery.tags = tag.join();
		}

		const posts = getEntityRecords( 'postType', 'post', postsQuery );

		return {
			posts,
		};
	} ),
	withColors( 'backgroundColor', 'textColor' ),
] )( AbelDisplayEdit );
