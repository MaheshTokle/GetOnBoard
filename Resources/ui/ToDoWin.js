var platform = Ti.Platform.osname;

//A window object which will be associated with the stack of windows
exports.ToDoWin = function(boardId,board) {
	var self = Ti.UI.createWindow({
		title: 'ToDo Items ('+board+')',
		backgroundColor: '#fff',
		navBarHidden: false,
		boardId: boardId,
		left: '100%',
		width: '100%',
		activity: {
			onCreateOptionsMenu: function(e) {
					var menu = e.menu;
				    var menuItem = menu.add({ title: "Add ToDo Item" });
				    menuItem.setIcon("images/ic_menu_add.png");
				    menuItem.addEventListener("click", function(e) {
				    	
				    });
			}
		}
	});
	
	var tableview = Ti.UI.createTableView();
	tableview.setData(getToDos(boardId));
	tableview.addEventListener('click', function(e) {
		
	});
	Ti.App.addEventListener('app:updateTodos', function() {

	});
	self.add(tableview);
	return self;
};

var getToDos = function(boardId) {
	var data = [];
	var row = null;
	var todoItems = [{id:1, item:'Todo1'},{id:2, item:'Todo2'},{id:3, item:'Todo3'}];
	
	for (var i = 0; i < todoItems.length; i++) {
		row = Ti.UI.createTableViewRow({
			id: todoItems[i].id,
			title: todoItems[i].item,
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
