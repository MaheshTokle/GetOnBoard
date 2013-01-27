if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}
else {
	//add a single variable to the global scope to which we may choose to
	//intentionally add items to
	var globals = {};
	
	//create a private scope to prevent further polluting the global object
	(function() {
		var BoardWindow = require('ui/BoardWindow').BoardWindow;
		
		//create our global tab group	
		globals.win = new BoardWindow(1);
		globals.win.open();
	})();
}