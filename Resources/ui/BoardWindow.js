var platform = Ti.Platform.osname;
/*var controller = new GetOnBoardController();*/
//A window object which will be associated with the stack of windows
exports.BoardWindow = function(user) {
	var ItemsWindow = require('ui/ItemsWindow').ItemsWindow;
	var AddBoardWindow = require('ui/AddBoardWindow').AddBoardWindow;

	var self = Ti.UI.createWindow({
		title: 'Boards',
		backgroundColor: '#fff',
		navBarHidden: true,
		userId: user,
		activity: {
			onCreateOptionsMenu: function(e) {
					var menu = e.menu;
				    var menuItem = menu.add({ title: "Add Board" });
				    menuItem.setIcon("images/ic_menu_add.png");
				    menuItem.addEventListener("click", function(e) {
				    	var addWindow = new AddBoardWindow(user);
				    	addWindow.open();
				    });
			}
		}
	});
	
	var appBar = Titanium.UI.createView({height: 100,backgroundColor: '#FF5583E3',left: 0, top: 0});
	
	var appBarLaelView = Titanium.UI.createView({height:'90%', width:'auto', left: 10});
	var appLabel = Ti.UI.createLabel({color:'white', left: 0, textAlign:'left', height:'100%', text:'GetOnBoard',  
				font: {fontWeight: 'bold', fontSize:30, fontStyle:'italic'},
				shadowColor:'red',
				shadowOffset:{x:5,y:5}
	});
	appBarLaelView.add(appLabel);
	appBar.add(appBarLaelView);
	
	var profileBtn = Titanium.UI.createView({height:'80%', width:'20%', backgroundColor:'#BF95A6CB', right:10});
	var profileName = Ti.UI.createLabel({color:'Black', textAlign:'center', height:'auto', text:'MT', font: {fontSize:20, fontStyle:'italic'}});
	profileBtn.add(profileName);
	appBar.add(profileBtn);
	
	self.add(appBar);
	
	var tableview = Ti.UI.createTableView({
		top: 100,
		left: 0
	});
	//controller.GetBoards({userId:16154913526645073}, setBoards, showError);
	tableview.setData(getBoards(user));
	tableview.addEventListener('click', function(e) {
		var items = new ItemsWindow(e.row.id, e.row.title);
		items.open();
	});
	Ti.App.addEventListener('app:updateBoards', function() {
		
	});
	self.add(tableview);
	return self;
};

var getBoards = function(board) {
	var data = [];
	var row = null;
	var boardItems = [{id:1, item:'Trello'},{id:2, item:'Appacitive'},{id:3, item:'Travelnxt'}];
	for(var j=4;j<20;j++){
		boardItems.push({id:j, item:'Board' + j})
	}
	for (var i = 0; i < boardItems.length; i++) {
		row = Ti.UI.createTableViewRow({
			id: boardItems[i].id,
			title: boardItems[i].item,
			color: '#000',
			backgroundColor: '#ccd5ef',
			height: 60,
			font: {
				fontWeight: 'bold',
				fontSize:20
			}
		});
		data.push(row);
	}
	return data;
};

var setBoards = function(boards) {
	var data = [];
	var row = null;
	for (var i = 0; i < boards.length; i++) {
		row = Ti.UI.createTableViewRow({
			id: boards[i].Id,
			title: boards[i].N,
			color: '#000',
			backgroundColor: '#ccd5ef',
			height: 60,
			font: {
				fontWeight: 'bold',
				fontSize:20
			}
		});
		data.push(row);
	}
	tableview.setData(data);
};

var showError = function(message){
	
}
