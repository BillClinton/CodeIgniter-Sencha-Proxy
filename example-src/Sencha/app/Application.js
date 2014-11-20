/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.Loader.setPath('Appunto.lib.proxy', './app/lib/proxy');
Ext.require('Appunto.lib.proxy.Codeigniter');

Ext.define('ProxyExample.Application', {
    extend: 'Ext.app.Application',
    
    name: 'ProxyExample',

	controllers: [
		'Users',
		'Errors'
	],

    stores: [
        // TODO: add global / shared stores here
    ],
    
    launch: function () {
        // TODO - Launch the application
    }
});
