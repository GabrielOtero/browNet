var page = require('webpage').create();
var dir = require('fs').absolute(".");

page.open("file://"+dir+"/Test/jasmine/SpecRunner.html", function(status) {

  	var passed = page.evaluate(function() {
	    return document.body.getElementsByClassName("bar passed");
  	});

  if(passed.length === 1){
		  phantom.exit(0);
	}else{
  		phantom.exit(1);
  	}
});