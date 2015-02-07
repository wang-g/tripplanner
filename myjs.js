var key = "ccaac64c-a47d-43a4-8e9f-61faf9296fcd";

function onSuccess(html) {
	console.log( html.responseText );
}

function myFunction() {
	var userInput = $("#tb").val();

	var url = "http://api.tripadvisor.com/api/partner/2.0/search/";
	url = url + userInput + "?key=" + key;
	
	console.log( "hello world" );

	var ajaxRequest = $.ajax({
		url: url,
		cache: false
	})

	ajaxRequest.fail(onSuccess);
}
