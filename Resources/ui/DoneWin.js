var platform = Ti.Platform.osname;

//A window object which will be associated with the stack of windows
exports.DoneWin = function(boardId,board) {
	var self = Ti.UI.createWindow({
		title: 'Done Items ('+board+')',
		backgroundColor: '#fff',
		navBarHidden: false,
		boardId: boardId,
		left: 300
	});
	
	var tableview = Ti.UI.createTableView();
	tableview.setData(getDoneItems(boardId));
	tableview.addEventListener('click', function(e) {
		
	});
	Ti.App.addEventListener('app:updateTodos', function() {

	});
	self.add(tableview);
	return self;
};

var getDoneItems = function(boardId) {
	var data = [];
	var row = null;
	var doneItems = [{id:1, item:'done1'},{id:2, item:'done2'},{id:3, item:'done3'}];
	
	for (var i = 0; i < doneItems.length; i++) {
		row = Ti.UI.createTableViewRow({
			id: doneItems[i].id,
			title: doneItems[i].item,
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
