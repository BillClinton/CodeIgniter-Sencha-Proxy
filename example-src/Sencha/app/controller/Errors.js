Ext.define('ProxyExample.controller.Errors', {
    extend: 'Ext.app.Controller',

	models: [
		'User'
	],

	stores : [
		'Users'
	],

    views: [
		'error.Panel'
    ],

    refs : [{
        ref : 'panel',
        selector: 'example-error-panel'
    }],

	/* */
    init: function() 
	{
        this.control(
        {
			'example-error-panel button[action=not_found]' : {
				click: this.forceNotFound
			},
			'example-error-panel button[action=db_error]' : {
				click: this.forceDbError
			},
			'example-error-panel button[action=ci_error]' : {
				click: this.forceCiError
			}
		});

	},


	forceNotFound: function()
	{
		this.getUsersStore().load({ci_method : 'fake_method_name'});
	},

	forceDbError: function()
	{
		this.getUsersStore().load({ci_method : 'db_error'});
	},

	forceCiError: function()
	{
		this.getUsersStore().load({ci_method : 'ci_error'});
	}

});
