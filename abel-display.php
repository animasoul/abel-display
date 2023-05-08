<?php

/**
 * Plugin Name:       Abel Display
 * Description: A Gutenberg plugin that allows the user to select pages or posts by category or tags and display them in different ways.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Abel Rogers
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

