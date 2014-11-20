CodeIgniter-Sencha-Proxy
========================

An extension of Ext.data.proxy.Ajax for communicating with CodeIgniter and a CodeIgniter library for formatting results

for a demo, go to http://www.appunto.net/codeigniter-sencha-proxy

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
to Your CodeIgniter application/libraries directory

```
$this->load->library('Senchaproxy');
```


#### Add the helper to your CodeIgniter Application

Copy senchaproxy_helper.php from the CodeIgniter-Sencha-Proxy/CodeIgniter/application/helpers
directory to your CodeIgniter application/helpers directory

The senchaproxy_helper.php contains a helper function _senchaproxy_config_ that will return a Javascript 
snippet that sets variables needed by the Codeigniter proxy such as the site_url so it knows where to 
send requests and CSRF information if applicable. 

Include the helper in your controllers like this:

```
$this->load->helper('senchaproxy');
```

and reference it in your view, in the <head> section, before your Ext JS files like this:
```
<? echo senchaproxy_config() ?>
```


#### Load the library

Add the Senchaproxy library to your config/autoload.php
```
$autoload['libraries'] = array('senchaproxy');
```

Or, you can load it in your controllers or models as needed 
```
$this->load->library('senchaproxy');
```

### Note on updating records

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
$this->form_validation->set_rules('my_field', 'Field Label', 'trim|callback__required_if_sent[my_field]|xss_clean');
```
Note that the callback requires the field name sent as a parameter so it can check to see if it has been sent in the POST.

Also note the double underscore between "callback" and "required_if_sent".  We preceded our custom validation rule function with an underscore
so it won't be accessible via URL, so we need to use two underscores when we implement it in form_validation->set_rules().
