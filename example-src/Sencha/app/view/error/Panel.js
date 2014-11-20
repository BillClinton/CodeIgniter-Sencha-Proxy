Ext.define('ProxyExample.view.error.Panel', {
    extend	: 'Ext.panel.Panel',
    alias   : 'widget.example-error-panel',

	title	: 'Example Errors',

	items	: [
	{
		xtype	: 'button',
		text	: '404 not found',
		margin	: 16,
		action	: 'not_found'
	},
	{
		xtype	: 'button',
		text	: 'Database Error',
		margin	: 16,
		action	: 'db_error'
	},
	{
		xtype	: 'button',
		text	: 'Coding Error',
		margin	: 16,
		action	: 'ci_error'
	}]	

});
