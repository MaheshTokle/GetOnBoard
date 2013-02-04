var platform = Ti.Platform.osname;

//A window object which will be associated with the stack of windows
exports.ItemsWindow = function(user,board) {
	var CreateItemsWindow = require('ui/CreateItem').CreateItemWindow;
	var self = Ti.UI.createWindow({
		title: 'Items',
		backgroundColor: '#fff',
		navBarHidden: true,
		userId: user,
		board: board,
		activity: {
			onCreateOptionsMenu: function(e) {
					var menu = e.menu;
				    var menuItem = menu.add({ title: "Add Item" });
				    menuItem.setIcon("images/ic_menu_add.png");
				    menuItem.addEventListener("click", function(e) {
				    	var itemsWin = new CreateItemsWindow(board.boardId);
				    	itemsWin.open();
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
	
	// TO DO view
	var tblTodoView = Ti.UI.createTableView({
		width: '90%'
	});
	tblTodoView.setData(getToDos(user));
	tblTodoView.addEventListener('click', function(e) {
		
	});
	
	// Doing view
	var tblDoingView = Ti.UI.createTableView({
		width: '90%'
	});
	tblDoingView.setData(getDoings(user));
	tblDoingView.addEventListener('click', function(e) {
		
	});
	
	//Done view
	var tblDoneView = Ti.UI.createTableView({
		width: '90%'
	});
	tblDoneView.setData(getDoneItems(user));
	tblDoneView.addEventListener('click', function(e) {
		
	});
		
	var scrollView = Titanium.UI.createScrollableView({
		views:[tblTodoView,tblDoingView,tblDoneView],
		showPagingControl:true,
		pagingControlHeight:30,
		maxZoomScale:2.0,
		currentPage:0,
		top: 102,
		clipViews: false
	});
	self.add(scrollView);
	return self;
};

var getDoings = function(boardId) {
	var data = [];
	var row = null;
	var doingItems = [{id:1, item:'Doing1'},{id:2, item:'Doing2'},{id:3, item:'Doing2'}];
	row = getItemRow({id:0, item: 'Doing items'}, '#FFBCCDEB');
	data.push(row);
	for (var i = 0; i < doingItems.length; i++) {
		row = getItemRow(doingItems[i], '#FFE4E8F0');
		data.push(row);
	}
	return data;
};

var getDoneItems = function(boardId) {
	var data = [];
	var row = null;
	var doneItems = [{id:1, item:'done1'},{id:2, item:'done2'},{id:3, item:'done3'}];
	row = getItemRow({id:0, item: 'Done items'}, '#FFBCEDC1');
	data.push(row);
	for (var i = 0; i < doneItems.length; i++) {
		row = getItemRow(doneItems[i], '#FFDDF0DF');
		data.push(row);
	}
	return data;
};

var getToDos = function(boardId) {
	var data = [];
	var row = null;
	var todoItems = [{id:1, item:'Todo1'},{id:2, item:'Todo2'},{id:3, item:'Todo3'}];
	row = getItemRow({id:0, item: 'ToDo items'}, '#FFE7C5B6');
	data.push(row);
	for (var i = 0; i < todoItems.length; i++) {
		row = getItemRow(todoItems[i], '#FFEEDDD6');
		data.push(row);
	}
	return data;
};

var getItemRow = function(item,color) {
	return Ti.UI.createTableViewRow({
		id: item.id,
		title: item.item,
		color: '#000',
		backgroundColor: color,
		height: 50,
		font: {
			fontWeight: 'bold'	
		}
	});
};


