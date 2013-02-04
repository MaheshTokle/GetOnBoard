/*var window = {}; 
var document = { 
		getElementById: function(){}, 
		createComment: function(){}, 
		documentElement: { 
			insertBefore: function(){}, 
			removeChild: function(){} 
		}, 
		createElement: function(elm){ 
			return obj = { 
					innerHTML: '', 
					appendChild: function(){}, 
					getElementsByTagName: function(){ return {}; }, 
					style: {} 
			}
		}
};
var navigator = { userAgent: "" }; 
var location = { href: '' };
Ti.include("jquery.min.js");
Ti.include("v1.js");
Ti.include("appacitiveSDK.min.js");

var isSessionCreated = false;
Appacitive.session.environment = 'live';
Appacitive.session.create({
apikey: 'bGwqYOoP8aBFfoo3cOktIMhiVWzPDHano/W105sH9dI=',
app: 'GetOnBoard'
});
Appacitive.eventManager.subscribe('session.success', function () {
	isSessionCreated = true;
});*/

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