exports.AddBoardWindow = function(user) {
	var self = Ti.UI.createWindow({
		title: 'Add Board',
		backgroundColor: '#fff',
		navBarHidden: true,
		userId: user,
		layout:'vertical'
	});
	var appBar = Titanium.UI.createView({
		height: 100,
		backgroundColor: '#FF5583E3',
		left: 0, 
		top: 0});
	//appbar code starts here
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
	//appbar code ends here
	var titleField = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  color: '#336699',
	  top: 10,
	  //left: 10,
	  //width: 250 ,
	  height: 60,
	  width:'90%',
	  hintText:'Title'
	});
	
	var descriptionField = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  color: '#336699', 
	  top: 10, 
	  //left: 10,
	  //width: 250,
	  width:'90%', 
	  height: 60,
	  hintText:'Description'
	});
	
	var button = Titanium.UI.createButton({
	   title: 'Done',   
	   top: 10,	  
	   width: 100,
	   height: 50
	});
	
	button.addEventListener('click',function(e)
	{
		var boardRQ = { userId : user,
			board: {
				title : titleField.value,
				description : descriptionField.value			
			}};
	   Titanium.API.info("You clicked the button");
	   alert(boardRQ.board.title);
	   // todo : Call add board api from controller
	});
	self.add(titleField);
	self.add(descriptionField);
	self.add(button);
	return self;
};