/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('ProxyExample.view.main.Main', {
    extend: 'Ext.panel.Panel',

    xtype: 'app-main',
    
	title: 'CodeIgniter-Sencha-Proxy example',

	layout	: {type: 'vbox', align: 'stretch'},

    items: [{
		xtype	: 'container',
		region	: 'center',
		height	: 460,
        layout	: {type: 'hbox', align: 'stretch'},
		items	: [
		{
			xtype	: 'panel',
			width	: 360,
			padding	: 8,
			style	: { background: '#fff' },
			html	: 'The grid on the right demonstrates common CRUD (create, read, update, destroy) operations.<br><br>' +
					'Right click on records for a context menu showing available operations.<br><br>'+
					'Client side validation has been removed to demonstrate how the proxy handles errors received from ' +
					"CodeIgniter's form validation class.  To test, username is a required field and email must be in a " +
					'valid format.<br><br>' +
					'Urls are automatically contructed using the CRUD action methods corresponding to the Ext JS operation: '+
					'<ul>' +
					'<li>store.load() : read</li>' +
					'<li>record.save() (new) : create</li>' +
					'<li>record.save() (existing) : update</li>' +
					'<li>record.erase() : destroy</li>' +
					'</ul>' +
					'These can be overwritten using the <b>ci_method</b> parameter on any operation or with the <b>api</b> config ' +
					'option defined by Ext.data.proxy.Ajax . See documentation in README.md at GitHub for more details.<br><br>',  
			autoscroll : true
		},
		{
			xtype	: 'example-user-list',
			flex	: 1
		}]
    },{
        region	: 'south',
        xtype	: 'container',
		flex	: 1,
        layout	: {type: 'hbox', align: 'stretch'},
        items	:[
		{
			xtype	: 'container',
			padding	: '48 8 0 8',
			style	: { background: '#fff' },
			html	: 'The buttons on the right force CodeIgniter errors to demonstrate error handling.<br><br>' +
					'You obviously want to eliminate these in production, but while in development it can be convenient to see ' +
					' them immediately rather going through the Developer Tools console to find them after a JSON decoding error',
			width	: 360
		},
		{
			xtype	: 'example-error-panel',
			flex	: 1
        }]
    }]
});
