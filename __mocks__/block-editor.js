import React from 'react';

export const InspectorControls = ( { children } ) => <div>{ children }</div>;
export const PanelColorSettings = ( { children } ) => <div>{ children }</div>;
export const withColors = () => ( Component ) => ( props ) =>
	<Component { ...props } />;
