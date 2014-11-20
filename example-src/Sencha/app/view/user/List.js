Ext.define('ProxyExample.view.user.List' ,{
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.example-user-list',
    store   : 'Users',

	requires	: [
		'Ext.toolbar.Paging',
		'Ext.ux.form.SearchField'
	],

	autoScroll	: true,

	border	: 0,

    viewConfig: {
        emptyText: 'No results found',
		loadMask : 'loading...'
    },

	columns : [
		{
			header   :  'Active', 
			dataIndex: 'active',
			width    : 96, 
			sortable : true, 
			align    : 'center', 
			menuDisabled: true,
			renderer : function(val,meta,rec) {
				meta.tdCls = (rec.get('active') == 0) ? 'user-inactive' : 'user-active';
				return '';
			} 
		},
		{header: 'username', dataIndex: 'username', menuDisabled: true, flex: 4},
		{header: 'name',  dataIndex: 'name', menuDisabled: true, flex: 3},
		{header: 'surname',  dataIndex: 'surname', menuDisabled: true, flex: 3},
		{header: 'email',  dataIndex: 'email', menuDisabled: true,   flex: 6}
	],

	tbar : [{ 
		xtype	: 'button', 
		text	: 'Add a user',
		iconCls : 'user-add',
		action	: 'add'
	},{
		xtype	: 'tbfill'
	},{
		xtype	: 'searchfield',
    	store   : 'Users'
	}],

	bbar : [{ 
		xtype		: 'pagingtoolbar',
		store   	: 'Users',
		displayInfo	: true
	}]


});
