var page = require('webpage').create();
page.open("file:///home/gabriel/github/browNet/Test/jasmine/SpecRunner.html", function(status) {

  	var passed = page.evaluate(function() {
	    return document.body.getElementsByClassName("bar passed");
  	});

  	if(passed.length === 1){
  		console.info("Success")
		phantom.exit(0);
	}else{
  		console.info("Fail")
  		phantom.exit(1);
  	}
});