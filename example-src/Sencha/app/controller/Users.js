Ext.define('ProxyExample.controller.Users', {
    extend: 'Ext.app.Controller',

	models: [
		'User'
	],

	stores : [
		'Users'
	],

    views: [
		'user.List',
		'user.Add',
		'user.Edit',
		'user.ContextMenu'
    ],

    refs : [{
        ref : 'list',
        selector: 'example-user-list'
    }],

	/* */
    init: function() 
	{
        this.control(
        {
            'example-user-list' : {
				render			: this.loadStore,
                itemdblclick	: this.editUser,
                itemcontextmenu	: this.showContextMenu,
                // Stop the browser getting the event
                containercontextmenu: function(view, e) { e.preventDefault(); }, 
                contextmenu		: function(e) { e.preventDefault(); } 
            },
            'example-user-list button[action="add"]': {
                click: this.addUser
            },
            'example-user-contextmenu menuitem[action="add"]': {
                click: this.addUser
            },
			'example-user-add button[action=save]' : {
				click: this.createUser
			},
            'example-user-contextmenu menuitem[action="edit"]': {
                click: this.editUser
            },
            'example-user-edit button[action=save]': {
                click: this.updateUser
            },
            'example-user-contextmenu menuitem[action="delete"]': {
                click: this.confirmUserDeletion
            },
            'example-user-contextmenu menuitem[action="activate"]': {
                click: this.activateUser
            },
            'example-user-contextmenu menuitem[action="deactivate"]': {
                click: this.deactivateUser
            }
		});

	},

	
	/**
	 * Loads the Users store.
	 * @return void
	 */
	loadStore: function()
	{
		this.getList().getStore().load();
	},

    showContextMenu: function(view, rec, item, idx, e)
    {
        e.preventDefault();

		var menu = Ext.widget('example-user-contextmenu');
	
		// pass the contextmenu the record so we don't have to worry about a selection change	
		menu.setRecord(rec);

		// select the record that was context-clicked
		view.getSelectionModel().select(rec,false,true); // keepExisting=false, suppressEvent=true

		// Show/Hide menu items based on record state
		if (rec.data.active == 1) 
		{
			menu.down('menuitem[action="activate"]').hide();
		} 
		if (rec.data.active == 0) 
		{
			menu.down('menuitem[action="deactivate"]').hide();
		} 
        menu.showAt(e.getXY());
    },

    addUser: function(source,e) 
    {
		var	win		= Ext.widget('example-user-add'),
			form	= win.down('form');

		form.getForm().findField('username').focus(false,100); 
		win.show();
	},

    createUser: function(button) 
    {
        var win    	= button.up('window'),
            form   	= win.down('form'),
            values 	= form.getValues(),
            record 	= Ext.create('ProxyExample.model.User'),
			store	= this.getList().getStore(),
			cb;

		cb = function(rec, operation) 
		{
			if (operation.success == true) 
			{ 
				store.insert(0,rec);
				win.close();
			} 
			else 
			{ 
				store.remove(record); 
			}
		}
		
		if (form.getForm().isValid())
		{
        	record.set(values);
			record.save({
				callback : cb 
			});	
		}
	},

    editUser: function(menuitem,e) 
    {
        var rec     = menuitem.up('menu').getRecord(),
			win		= Ext.widget('example-user-edit'),
			form	= win.down('form');

		form.loadRecord(rec);
		form.getForm().findField('username').focus(false,100); 
		win.show();
	},

    updateUser: function(button) 
	{
        var win    = button.up('window'),
            form   = win.down('form').form,
            record = form.getRecord(),
            values = form.getValues(),
			cb;

		cb = function(rec, operation) {
			if (operation.success == true) { rec.commit(); win.close(); } else { record.reject() };
		}

		if (form.isDirty())
		{
			if (form.isValid())
			{
				record.set(values);
				record.save({ callback : cb });	
			}
		} 
		else
		{
			win.close();
		}

    },


    confirmUserDeletion: function(menuitem) 
	{
        var rec     = menuitem.up('menu').getRecord(),
			store	= this.getList().getStore(),
			title	= 'Delete user '+rec.data.username+' ('+rec.data.email+')';

        Ext.MessageBox.confirm(title, 'Are you sure you wish to delete this user?', Ext.bind(this.deleteUser,this,[rec,store],true));
	},

    deleteUser: function(button, dummy, msgbox, record, store)
    {
        if (button == "yes")
        {
            record.erase(
				{
					success: function() { store.remove(record); } 
				}
			);
        }
	},

    activateUser: function(menuitem) 
	{
        var record 	= menuitem.up('menu').getRecord(),
			fail_cb;

		fail_cb = function() { record.reject(); }

		record.set({ active: 1 });
		record.save({ failure: fail_cb });	
    },

    deactivateUser: function(menuitem) 
	{
        var record 	= menuitem.up('menu').getRecord(),
			fail_cb;

		fail_cb = function() { record.reject(); }

		record.set({ active: 0 });
		record.save({ failure: fail_cb });	
    }

});
