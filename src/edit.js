import { withColors } from '@wordpress/block-editor';
import { withSelect } from '@wordpress/data';
import { Fragment, Component } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import abelDisplayAnimate from './utils/animate';
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
		// console.log("this.props: ");
		// console.log(this.props);

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

		if ( posts ) {
			abelDisplayAnimate();
		}
	}

	render() {
		const { category, tag, posts, displayStyle, imageSize } =
			this.props.attributes;

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
		// console.log("posts: ".post);
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
								<a
									className="shape"
									href={ post.link }
									key={ post.id }
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
	}
}

export default compose( [
	withSelect( ( select, props ) => {
		const { getEntityRecords } = select( 'core' );
		const { category, tag, numberposts } = props.attributes;

		let postsQuery = {
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

		// console.log( 'Posts query: ', postsQuery ); // Debug line

		const posts = getEntityRecords( 'postType', 'post', postsQuery );

		// console.log( 'Posts response: ', posts ); // Debug line

		return {
			posts,
		};
	} ),
	withColors( 'backgroundColor', 'textColor' ),
] )( AbelDisplayEdit );
