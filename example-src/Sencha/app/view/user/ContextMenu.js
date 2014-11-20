Ext.define('ProxyExample.view.user.ContextMenu' ,{
    extend  : 'Ext.menu.Menu',
    alias   : 'widget.example-user-contextmenu',

	config	: {
		record	: null
	},

    items : [
        {
            text    : 'Add User',
            action  : 'add', 
            iconCls : 'user-add'
        },
        {
            text    : 'Edit User',
            action  : 'edit', 
            iconCls : 'user-edit'
        },
        {
            text    : 'Delete User',
            action  : 'delete', 
            iconCls : 'user-delete'
        },
		{
            text    : 'Activate User',
			action  : 'activate',
			iconCls : 'accept'
        },
		{
            text    : 'Deactivate User',
			action  : 'deactivate',
			iconCls : 'delete'
		}
    ]
})
