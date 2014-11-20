Ext.require('Ext.data.Model');
Ext.require('Appunto.lib.proxy.Codeigniter');

Ext.define('ProxyExample.model.User', 
{
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'username', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'surname', type: 'string'},
        {name: 'email', type: 'string'}
    ],
    proxy: 
    {
        type    : 'ci',
        ci_class: 'user'
    }
});
