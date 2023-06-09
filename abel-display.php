<?php

/**
 * Plugin Name:       Abel Display
 * Plugin URI:        https://www.ajpartnersltd.com/building-a-wordpress-gutenberg-block-plugin-a-revised-guide/
 * Description:       A Gutenberg plugin that allows the user to select pages or posts by category or tags and display them in different ways.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Abel Rogers
 * Author URI:        https://www.ajpartnersltd.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       abel-display
 *
 * @package           create-block
 */
function create_block_abel_display_block_init()
{
	register_block_type(__DIR__ . '/build');
}
add_action('init', 'create_block_abel_display_block_init');

function enqueue_block_editor_assets() {
    $image_sizes = array();
    foreach ( get_intermediate_image_sizes() as $size ) {
        $image_sizes[ $size ] = $size;
    }

    wp_register_script(
        'localize-script',
        plugins_url( 'abel-display/localize-script.js', __DIR__  ),
        array(),
        filemtime( plugin_dir_path( __DIR__ ) . 'abel-display/localize-script.js' ),
        true
    );

    wp_localize_script( 'localize-script', 'wpImageSizes', $image_sizes );
    wp_enqueue_script( 'localize-script' );
}
add_action( 'enqueue_block_editor_assets', 'enqueue_block_editor_assets' );

