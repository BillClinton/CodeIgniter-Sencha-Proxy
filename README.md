CodeIgniter-Sencha-Proxy
========================

An extension of Ext.data.proxy.Ajax for communicating with CodeIgniter and a CodeIgniter library for formatting results

for a demo, go to http://www.appunto.net/codeigniter-sencha-proxy

- [Information](#information)
	- [Features](#features)
	- [Supported versions](#supported-versions)
	- [Limitations](#limitations)
	- [Installation and Configuration](#installation-and-configuration)
		- [Set up proxy in your Ext JS application](#set-up-proxy-in-your-ext-js-application)
		- [Set up proxy in your CodeIgniter application](#set-up-proxy-in-your-codeigniter-application)
	- [Using the library in your Ext JS code](#using-the-library-in-your-ext-js-code)
		- [Add the proxy to your Ext JS model](#add-the-proxy-to-your-ext-js-model)
		- [Load store data](#load-store-data)
		- [Create records](#create-records)
		- [Delete records](#delete-records)
		- [Update records](#update-records)
	- [Using the library in your CodeIgniter code](#using-the-library-in-your-codeigniter-code)
		- [Format query results](#format-query-results)
		- [Format operation results](#format-operation-results)
		- [Sending responses from Controller](#sending-responses-from-controller)
- [Notes](#notes)
	- [Note on updating records](#note-on-updating-records)

<!-- /MarkdownTOC -->

# Information

### Features
- Sends data to CodeIgniter controllers in POST so CodeIgniter form validation library can be used
- Reads CodeIgniter error pages for descriptive error pop-ups rather than JSON decoding errors
- Catches JSON decoding exceptions
- Builds CodeIgniter URIs using CRUD operation actions or optional config parameters
- Automatically sends CSRF info with requests if CSRF is enabled
- Includes CodeIgniter library functions for formatting/transmitting data to Ext JS applications

### Supported versions
CodeIgniter-Sencha-Proxy has been tested with Ext JS 5.0.1 GPL and CodeIgniter 2.20

### Limitations
CodeIgniter-Sencha-Proxy does not support batch operations.
 
## Installation and Configuration

### Set up proxy in your Ext JS application

#### Add the proxy files to your Ext JS application.js

Copy the Codeigniter.js, CiReader.js, and CiWriter.js files from the CodeIgniter-Sencha-Proxy/Sencha/lib/proxy directory
to your Ext JS application directory.  I suggest creating a lib/proxy directory path under your app directory so the files reside
in application_directory/app/lib/proxy 

#### Include the library at the top of your Application.js
```
Ext.Loader.setPath('SenchaProxy.lib.proxy', './lib/proxy/');
Ext.require('SenchaProxy.lib.proxy.Codeigniter');
```

Make sure you adjust the second parameter of Ext.Loader.setPath to the directory 
where you copied the Codeigniter.js, CiReader.js, and CiWriter.js files

#### Refresh your Ext JS application

run __sencha app refresh__


### Set up proxy in your CodeIgniter application

#### Add the library to your CodeIgniter Application

Copy Senchaproxy.php from the CodeIgniter-Sencha-Proxy/CodeIgniter/application/libraries 
to your CodeIgniter application/libraries directory.  Include the library in your controller
and model code like this:

```
$this->load->library('senchaproxy');
```


#### Add the helper to your CodeIgniter Application

Copy senchaproxy_helper.php from the CodeIgniter-Sencha-Proxy/CodeIgniter/application/helpers
directory to your CodeIgniter application/helpers directory

The senchaproxy_helper.php contains a helper function __senchaproxy_config__ that will return a Javascript 
snippet that sets variables needed by the Codeigniter proxy such as the site_url so it knows where to 
send requests and CSRF information if applicable. It will also include the CSS file relative to the root of
your application using base_url()

Include the helper in your controllers like this:

```
$this->load->helper('senchaproxy');
```

and reference it in your view, in the &lt;head&gt; section, before your Ext JS files like this:
```
<? echo senchaproxy_config() ?>
```

#### Copy the resources folder to the root of your application directory

The CodeIgniter-Sencha-Proxy/resources directory contains a css file and a few images for the 
error pop-up windows. Copy it to the root of your CodeIgniter application.

## Using the library in your Ext JS code

#### Add the proxy to your Ext JS model

Add the proxy to your model's configuration like this:

```
Ext.require('Ext.data.Model');
Ext.require('Appunto.lib.proxy.Codeigniter');

Ext.define('MyApplication.model.User', 
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
```
The __ci_class__ attribute is your CodeIgniter controller class name.

#### Load store data

A store.load() command on a store that uses the above model will load the store using a __user/read__ URI.

If you name your controller function something other than read, for example "get_data", you can
load your store like this:

```
store.load( {ci_method: 'get_data' } ); 
```
This would attempt to load the store using a __user/get_data__ URI

#### Create records

Example of creating and saving a record populated by form data:

```
    createUser: function(button) 
    {
        var panel	= button.up('panel'),
            form   	= panel.down('form'),
            values 	= form.getValues(),
            record 	= Ext.create('MyApplication.model.User'),
			store	= Ext.getStore('Users'),
			cb;

		cb = function(rec, operation) 
		{
			if (operation.success == true) 
			{ 
				store.insert(0,rec);
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
```

The above example will attempt to create the record using a URI of __user/create__.  If you name 
your controller function something other than read, for example "add_user", you can save your 
record by adding the ci_method configuration parameter to the save function like this:
```
			record.save({
				callback 	: cb,
				ci_method	: 'add_user'
			});	
```

#### Delete records

Example of updating a record populated by form data:
```
    updateUser: function(button) 
	{
        var panel	= button.up('panel'),
            form   	= panel.down('form').form,
            record 	= form.getRecord(),
            values 	= form.getValues(),
			cb;

		cb = function(rec, operation) {
			if (operation.success == true) { rec.commit(); } else { record.reject() };
		}

		if (form.isDirty())
		{
			if (form.isValid())
			{
				record.set(values);
				record.save({ callback : cb });	
			}
		} 
    },
```
 
The above example will attempt to update the record using a URI of __user/update__.  As mentioned
above, you can alter the name of the CodeIgniter controller function being called by adding the 
ci_method configuration parameter to the save function.

#### Update records

Example of deleting a record:
```
		record.erase(
			{
				success: function() { store.remove(record); } 
			}
		);
```
The above example will attempt to delete the record using a URI of user/destroy.  As mentioned
above in the previous examples, you can alter the name of the CodeIgniter controller function
being called by adding the ci_method configuration parameter to the erase function, like this:
```
		record.erase(
			{
				ci_method	: 'delete_user'  // CodeIgniter function name
				success		: function() { store.remove(record); } 
			}
		);
```

## Using the library in your CodeIgniter code


Include the library in your model code:
```
$this->load->library('Senchaproxy');
``` 

The library includes two functions for formatting results
- formatQueryResult() : formats query results
- formatOperationResult() : formats results of insert, update and delete operations

#### Format query results

Example of formatting the results of a SELECT query:

```
$query = $this->db->get('mytable');
$total = $this->db->count_all_results();

// return formatted result
return $this->senchaproxy->formatQueryResult($query,$total);
```
A more extensive example showing a query with sorting, pagination, and search is available in
the demo code.

#### Format operation results

Example of formatting the results of a DB insert:

```
$this->db->set('username',$data['username']);
$this->db->set('email',$data['email']);

$query = $this->db->insert(mytable);

// get newly created record
$record = $this->get($this->db->insert_id());

// return formatted result
return $this->senchaproxy->formatOperationResult($query,array($record[0]));
```
formatOperationResult() optionally returns a record so you can send back a record with the new id
and potentially perform other operations without reloading the store. 


Example of formatting the results of a DB update:

```
// get/set the id and remove it from the data array
$id = $data['id'];
$this->db->where('id', $id);
unset($data['id']);

// execute query
$query = $this->db->update($this->table, $data);

// get the record
$record = $this->get($id)

// return formatted result
return $this->senchaproxy->formatOperationResult($query,$record);
```
formatOperationResult() optionally returns a record so in this example a "get" method that returns a single 
record is being called.  This can be useful if some record values are changed by on_update db triggers.

Example of formatting the results of a DB delete:
```
// get/set the id 
$this->db->where('id', $data['id']);

// execute query
$query = $this->db->delete('my_table);

// return formatted result
return $this->senchaproxy->formatOperationResult($query);
```
You can see these examples in action in the demo, or in the source of the example code available in src/CodeIgniter

#### Sending responses from Controller

The library includes a sendResponse() function for encoding responses and sending them to the user.

Example of a controller create function using send response to return ether form validation errors or
the result of the insert:
```
    function create()
    {
		$this->form_validation->set_rules('username', 'Username', 'trim|required|xss_clean');
		$this->form_validation->set_rules('email', 'Email address', 'trim|required|valid_email|xss_clean');

        if ($this->form_validation->run()==FALSE) 
        {
            $result = array (
                'success'   => false,
                'msg'       => 'Errors were encountered with your request.  Please correct them and try again.',
                'errors'    => validation_errors()
            );
        } 
        else 
        {
			// return all POST items with XSS filter
            $data = $this->input->post(NULL, TRUE); 

            // get result
            $result = $this->usermodel->create_record($data);
        }
        $this->senchaproxy->sendResponse($result);
	}
```

# Notes

#### Note on updating records

If you use Ext JS record.save() to update records, this can create an issue with server side validation of NOT NULL fields. Ext JS
record.save() will only send changed fields.  If you use Codeigniter's "required" form validation rule, unchanged fields that
are not sent to the server will trigger this rule.  But if you do not validate this field as required, you risk accepting a blank 
value.  One way to resolve this is to add a custom validation rule to your CodeIgniter controller like this:
```
	function _required_if_sent($val,$field)
	{
		if ($this->input->post($field)!==false) //boolean false if not sent at all, which is ok
		{
			if (empty($val))
			{
				$this->form_validation->set_message('_required_if_sent', 'The %s field can not be blank');
				return false;
			}
		}
		return true;
	}
```
Which you could use like this:
```
$this->form_validation->set_rules(
	'my_field', 
	'Field Label', 
	'trim|callback__required_if_sent[my_field]|xss_clean'
);
```
Note that the callback requires the field name sent as a parameter so it can check to see if it has been sent in the POST.

Also note the double underscore between "callback" and "required_if_sent".  We preceded our custom 
validation rule function with an underscore so it won't be accessible via URL, so we need to use two 
underscores when we implement it in form_validation->set_rules().



