<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * SenchaProxy helper
 * 
 *   a Javascript snippet with site url and CSRF info
 *
 */
if ( ! function_exists('senchaproxy_config'))
{
	function senchaproxy_config()
	{
		$CI =& get_instance();
		$CI->load->helper('url');

		$js = '<script type="text/javascript">';
		$js .= 'var ci_site_url = "'.rtrim(site_url(), "/").'/";';
		if ($CI->config->item('csrf_protection') == true)
		{
			$js .= 'var ci_token= "'.$CI->config->item('csrf_token_name').'",';
			$js .= 'ci_cookie= "'.$CI->config->item('csrf_cookie_name').'";';
		}
		$js .= '</script>';

		return $js;
	}
}
