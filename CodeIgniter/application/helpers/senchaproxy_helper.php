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

		$css = '<link rel="stylesheet" type="text/css" href="'.base_url().'resources/proxy/css/icons.css" />';

		return $js . PHP_EOL . $css;
	}
}
