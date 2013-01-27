var userModel = function () {
    this.Id = -1;
    this.UN = ""; //UserName
    this.E = ""; //Email
    this.FN = ""; //FirstName
    this.LN = ""; //LastName 
    this.B = []; //boards connected to this user
};
var boardModel = function () {
    this.Id = -1;
    this.N = ""; //Name
    this.D = ""; //Description 
    this.St = []; //Statuses
    this.Items = []; // will contain list of items for this board
};
var itemModel = function () {
    this.Id = -1;
    this.T = ""; //Title
    this.D = ""; //Description
    this.P = 2; //Priority 
    this.St = ""; //Status 
};

var GetOnBoardController = function () {
    this.User = null;
    this.Boards = [];
    this.AuthenticateUser = function (user, onSuccess, onError) {
        var credentials = {
            username: user.username,
            password: user.password,
            expiry: 14 * 24 * 3600 + '',
            attempts: -1
        };
        var _this = this;
        Appacitive.Users.authenticateUser(credentials, function (result) {
            _this.User = result.user; //translate
            if (onSuccess && typeof (onSuccess) == 'function') onSuccess(_this.User);
        }, onError);
    };
    this.CreateUser = function (userCreateRq, onSuccess, onError) {
        var users = new Appacitive.ArticleCollection({ schema: 'user' });
        var user = users.createNewArticle(userCreateRq.user);
        var _this = this;
        user.save(function (result) {
            _this.User = result.user;
        }, onError);
    };
    this.GetBoards = function (boardSearchRq, onSuccess, onError) {
        // get boards for the search request
        boardSearchRq = $.extend({}, {
            userId: -1
        }, boardSearchRq);
        var users = new Appacitive.ArticleCollection({ schema: 'user' });
        var user = users.createNewArticle({ __id: boardSearchRq.userId });
        var _this = this;
        user.fetch(function () {
            var myBoards = user.getConnectedArticles({ relation: 'myboards' });
            myBoards.fetch(function () {
                var boards = myBoards.getAll().map(function (b) { return b.connectedArticle.getArticle(); });
                _this.Boards = boards; // translate to model
                if (onSuccess && typeof (onSuccess) == 'function') onSuccess(boards);
            }, onError);
        }, onError);
    };
    this.GetItems = function (itemSearchRq, onSuccess, onError) {
        itemSearchRq = $.extend({}, {
            boardId: -1
        }, itemSearchRq);
        var boards = new Appacitive.ArticleCollection({ schema: 'board' });
        var board = boards.createNewArticle({ __id: itemSearchRq.boardId });
        var _this = this;
        board.fetch(function () {
            var boardItems = board.getConnectedArticles({ relation: 'on' });
            boardItems.fetch(function () {
                var items = boardItems.getAll().map(function (b) { return b.connectedArticle.getArticle(); });
                //_this.Boards // set item in Boards[boardId]
                for (var i = 0; i < _this.Boards.length; i++) {
                    if (_this.Boards[i].__id === itemSearchRq.boardId)
                        _this.Boards[i].Items = items;
                }
                if (onSuccess && typeof (onSuccess) == 'function') onSuccess(items);
            }, onError);
        }, onError);
    };
    this.CreateBoard = function (createBoardRq, onSuccess, onError) {
        var items = new Appacitive.ArticleCollection({ schema: 'board' });
        //get appacitive object 
        // board = getBoardFromCreateBoardRQ
        var item = items.createNewArticle(createBoardRq.board);
        var isSaveSuccess = false;
        item.save(function () {
            isSaveSuccess = true;
            var connectOptions = {
                __endpointa: {
                    articleid: createBoardRq.userId, // user id
                    label: 'user'
                },
                __endpointb: {
                    articleid: item.get('__id'), // get item id
                    label: 'board'
                }
            };
            var cC = new Appacitive.ConnectionCollection({ relation: 'myboards' });
            var connection = cC.createNewConnection(connectOptions);
            connection.save(onSuccess, onError);
        }, onError);
    };
    this.CreateItem = function (createItemRq, onSuccess, onError) {
        var items = new Appacitive.ArticleCollection({ schema: 'item' });
        //get appacitive object 
        // board = getBoardFromCreateBoardRQ
        var item = items.createNewArticle(createItemRq.item);
        var isSaveSuccess = false;
        item.save(function () {
            isSaveSuccess = true;
            var connectOptions = {
                __endpointa: {
                    articleid: createItemRq.boardId, // board id
                    label: 'board'
                },
                __endpointb: {
                    articleid: item.get('__id'), // get item id
                    label: 'item'
                }
            };
            var cC = new Appacitive.ConnectionCollection({ relation: 'on' });
            var connection = cC.createNewConnection(connectOptions);
            connection.save(onSuccess, onError);
        }, onError);
    };
    this.UpdateItem = function (updateItemRq, onSuccess, onError) {
        var items = new Appacitive.ArticleCollection({ schema: 'item' });
        var item = items.createNewArticle({ __id: updateItemRq.item.__id });
        item.fetch(function () {
            var it = item.getArticle();

            it.title = updateItemRq.item.title;
            it.description = updateItemRq.item.description;
            it.priority = updateItemRq.item.priority;
            it.status = updateItemRq.item.status;
            var saveSuccess = false;
            item.save(function () {
                saveSuccess = true;
            }, function () {
                console.log("item save failed.");
            });
        });
    };
};
var saveObject = function (schema, obj) {
    var items = new Appacitive.ArticleCollection({ schema: schema });
    var item = items.createNewArticle(obj);
    item.save(function () {
        var itemId = item.get('__id');
        alert('Save' + schema + ' succeeded. Item Id: #' + itemId);
    }, function () {
        alert('Save failed');
    });
};

