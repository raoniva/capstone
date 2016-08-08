var express = require('express');
var fs = require('fs');
var app = express();
var router = express.Router();
// var multer  = require('multer')
// var upload = multer()

// var bodyParser = require('body-parser');
// app.use(bodyParser.json()); // support json encoded bodies, for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies, for parsing application/x-www-form-urlencoded

router.post('/setData', upload.array(), function (req, res, next) {
	var body = '';
	filePath = __dirname + '/data/data_buffer.txt';
	request.on('data', function(data) {
		body += data;
	});

	request.on('end', function (){
		// var size = fs.statSync(filePath)["size"];
		// if (size / 1000000.0 > 1)
		// {
		// fs.
		// }
		// else
		// {
		fs.appendFile(filePath, body, function() {
			respond.end();
		});
		// }
	});
});

router.get('/getData', function(req, res){
	filePath = __dirname + '/data/data_buffer.txt';
	fs.open(filePath , 'r' , function (err, fd){ 
		if(err){ 
			console.error(err); 
			return; 
		} 

		var buf = new Buffer(1000); 
		fs.read(fd, buf, 0, 1000, null, function(err, bytesRead, buffer){ 
			if(err){ 
				console.log(err); 
				return; 
			} 
			console.log('bytesRead: ' +bytesRead); 
			console.log(buffer); 
			res.send(buf);
		})
	})
});

// app.listen(8888);
module.exports = router;