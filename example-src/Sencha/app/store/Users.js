Ext.require('Ext.data.Store');
Ext.require('ProxyExample.model.User');

Ext.define('ProxyExample.store.Users', {
    extend: 'Ext.data.Store',
    model : 'ProxyExample.model.User',
    pageSize : 10,
    remoteSort: true,
    remoteFilter: true,
    autoLoad: false
});
