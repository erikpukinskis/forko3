$(document).ready(function() {
	editAreaLoader.init({
		id: "code"	// id of the textarea to transform		
		,start_highlight: true	// if start with highlight
		,allow_resize: "no"
    ,toolbar: ""
		,allow_toggle: false
		,language: "en"
		,syntax: "html"	
    ,replace_tab_by_spaces: 2
	});
	
	$("form").submit(function(e) {
	  var code = editAreaLoader.getValue('code');
	  $("#hidden_code").val(code);
	  return true;
	});
});