var platform = Ti.Platform.osname;

//A window object which will be associated with the stack of windows
exports.ListWindow = function(args) {
	var self = Ti.UI.createWindow(args);
	var isDone = args.isDone;
	var tableview = Ti.UI.createTableView();
	tableview.setData(getTableData(isDone));
	
	if (!isDone) {
		if (platform !== 'android') {
			var addBtn = Ti.UI.createButton({
				title:'+'
			});
			addBtn.addEventListener('click', function() {
				
			});
			self.rightNavButton = addBtn;
		}
	}
	tableview.addEventListener('click', function(e) {
		createConfirmDialog(e.row.id, e.row.title, isDone).show();
	});
	
	Ti.App.addEventListener('app:updateTables', function() {
		tableview.setData(getTableData(isDone));
	});
	self.add(tableview);
	return self;
};

var getTableData = function(done) {
	var data = [];
	var row = null;
	var todoItems = [{id:1, item:'Trello'},{id:2, item:'Appacitive'},{id:3, item:'Travelnxt'}];
	for(var j=4;j<20;j++){
		todoItems.push({id:j, item:'Board' + j})
	}
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
