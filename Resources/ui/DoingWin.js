var platform = Ti.Platform.osname;

//A window object which will be associated with the stack of windows
exports.DoingWin = function(boardId,board) {
	var self = Ti.UI.createWindow({
		title: 'Doing Items ('+board+')',
		backgroundColor: '#fff',
		navBarHidden: false,
		boardId: boardId,
		left: 200
	});
	
	var tableview = Ti.UI.createTableView();
	tableview.setData(getDoings(boardId));
	tableview.addEventListener('click', function(e) {
		
	});
	Ti.App.addEventListener('app:updateTodos', function() {

	});
	self.add(tableview);
	return self;
};

var getDoings = function(boardId) {
	var data = [];
	var row = null;
	var doingItems = [{id:1, item:'Doing1'},{id:2, item:'Doing2'},{id:3, item:'Doing2'}];
	
	for (var i = 0; i < doingItems.length; i++) {
		row = Ti.UI.createTableViewRow({
			id: doingItems[i].id,
			title: doingItems[i].item,
			color: '#000',
			backgroundColor: '#ccd5ef',
			height: 50,
			font: {
				fontWeight: 'bold'	
			}
		});
		data.push(row);
	}
	return data;
};
