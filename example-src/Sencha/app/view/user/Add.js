Ext.define('ProxyExample.view.user.Add', {
    extend  	: 'Ext.window.Window',
    alias   	: 'widget.example-user-add',

	requires	:	[
		'Ext.form.field.Checkbox'
	],

    title   	: 'Add User',
    iconCls 	: 'user-add',
    layout  	: 'fit',
    autoShow	: true,
    modal   	: true,

	items : [
		{
			xtype: 'form',
			baseCls: 'x-plain',
			border: false,
			bodyStyle: {
				padding : '10px'
			},
			defaults: {
				width		: 460,
				labelWidth	: 180,
				msgTarget 	: 'under'
			},
			items: [
				{
					name        : 'username',
					fieldLabel	: 'Username',
					xtype       : 'textfield',
					allowBlank	: true
				},{
					name        : 'email',
					fieldLabel	: 'Email',
					xtype       : 'textfield',
					value		: '',		// initialzing field so changes will show it as dirty
					allowBlank	: true
				},{
					name        : 'name',
					fieldLabel	: 'Name',
					xtype       : 'textfield',
					value		: '',		// initialzing field so changes will show it as dirty
					allowBlank	: true
				},{
					name        : 'surname',
					fieldLabel	: 'Last name',
					xtype       : 'textfield',
					value		: '',		// initialzing field so changes will show it as dirty
					allowBlank	: true
				},{
					name        	: 'active',
					fieldLabel		: 'Set active',
					inputValue		: '1',
					uncheckedValue	: '0',
					style: {
						marginTop: '18px'
					},
					xtype       	: 'checkbox',
					checked			: true
				}
			]
		}
	],

	buttons : [
		{
			text	: 'Save',
			action	: 'save'
		},
		{
			text	: 'Cancel',
			handler	: function () { this.up('.window').close(); }
		}
	]

});
