Ext.define('ProxyExample.view.user.Edit', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.example-user-edit',

    title  	: 'Edit User',
    iconCls : 'user-edit',
    layout  : 'fit',
    autoShow: false,
    modal   : true,

    initComponent: function() 
	{
        this.items = [
            {
                xtype: 'form',
                baseCls: 'x-plain',
                border: false,
				bodyStyle: {
					padding : '10px'
				},
				defaults: {
					width		: 460,
					labelWidth	: 120,
					msgTarget 	: 'under'
				},
                items: [
                    {
                        name        : 'username',
						fieldLabel	: 'Username',
                        xtype       : 'textfield',
						value		: '',		// initialzing field so changes will show it as dirty
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
						fieldLabel		: 'Active',
						labelAlign		: 'left',
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
        ];

        this.buttons = [
            {
				text	: 'Save',
                action	: 'save'
            },
            {
				text	: 'Cancel',
				handler	: function () { this.up('.window').close(); }
            }
        ];

        this.callParent(arguments);
		this.down('form').getForm().trackResetOnLoad = true;  
    }
});
