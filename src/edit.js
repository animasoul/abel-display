import { withColors } from '@wordpress/block-editor';
import { withSelect } from '@wordpress/data';
import { Fragment, Component } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import abelDisplayAnimate from './script';

const getFeaturedOrFirstImage = ( post ) => {
	if ( post._embedded && post._embedded[ 'wp:featuredmedia' ] ) {
		return post._embedded[ 'wp:featuredmedia' ][ 0 ].source_url;
	}
	const content = post.content ? post.content.rendered : null;
	const imgRegex = /<img[^>]+src="(http:\/\/[^">]+|https:\/\/[^">]+)"/g;
	const match = imgRegex.exec( content );
	if ( match && match[ 1 ] ) {
		return match[ 1 ];
	}
	return null;
};

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
				.then( ( categories ) => {
					setAttributes( { categories } );
				} );
		}

		if ( ! tags ) {
			apiFetch( { path: '/wp/v2/tags?_fields=id,name' } )
				.then( ( response ) => response.json() )
				.then( ( tags ) => {
					setAttributes( { tags } );
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
		const { category, tag, posts, displayStyle } = this.props.attributes;

		if ( ! category || ! tag ) {
			return (
				<div className="wp-block-create-block-abel-display">
					<div id="abel-wrapper">
						<div className="shape">__(&quot;Loading...&quot;)</div>
					</div>
				</div>
			);
		}

		if ( ! posts || posts.length === 0 ) {
			return __( 'No posts found.' );
		}
		// console.log("posts: ".post);
		return (
			<div
				className={
					'abel-display-posts abel-display-style-' + displayStyle
				}
			>
				{ posts && posts.length > 0 ? (
					<div id="abel-wrapper">
						{ posts.map( ( post ) => {
							const imageSrc = getFeaturedOrFirstImage( post ); // Get the featured or first image from the post
							return (
								<a
									className="shape"
									href={ post.link }
									key={ post.id }
								>
									{ imageSrc && (
										<img
											src={ imageSrc }
											alt={ post.title.rendered }
											loading="lazy"
										/>
									) }
									{ post.title.rendered }
								</a>
							);
						} ) }
					</div>
				) : (
					<Fragment>
						<div id="abel-wrapper">{ __( 'No posts found.' ) }</div>
					</Fragment>
				) }
			</div>
		);
	}
}

export default compose( [
	withSelect( ( select, props ) => {
		const { getEntityRecords } = select( 'core' );
		const { category, tag } = props.attributes;

		const postsQuery = {
			per_page: -1,
			post_status: 'publish',
			post_type: 'post',
			_embed: true,
			_fields:
				'id,link,title.rendered,content.rendered,_embedded.wp:featuredmedia',
		};

		if ( category && category.length ) {
			postsQuery.categories = category.join();
		}

		if ( tag && tag.length ) {
			postsQuery.tags = tag.join();
		}
		// console.log("postquery: ");
		// console.log(postsQuery);

		const posts = getEntityRecords( 'postType', 'post', postsQuery );
		// console.log("posts");
		// console.log(posts);

		return {
			posts,
		};
	} ),
	withColors( 'backgroundColor', 'textColor' ),
] )( AbelDisplayEdit );
