/* requiring modules */
var http = require('http');
var express = require('express');
var app = express();
var httpServer = http.createServer(app);
var socketIO = require('socket.io');
var fs = require('fs');
var bodyParser = require('body-parser');
/* end of requiring modules */


/* app specific settings */
var PORT = 3000;
app.use(express.static(__dirname + '/app'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

/* end of app specific settings */

/*if (!module.parent) {// assigning to exports will not modify module, must use module.exports
  //app.listen(3000);
  var io = require('socket.io').listen(app.listen(3000));  
};*/

/*error handler from server*/
function handleError(res,text,err){
    var gen;
    if(err.name == 'ValidationError'){
        gen = 'some field(s) were not of the type expected';
    }
    else if(err.name == 'MongoError'){
        if(err.code == 11000){
            gen = 'unique key constraint violated';
        }
    }
    res.status(500);
    res.json({error: `${text} due to ${gen}`, cause: err.message});
}
/*end of error handler from server*/

/* start server on port */
httpServer.listen(PORT);
console.log('Express started the server on port 3000');