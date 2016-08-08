var express = require('express');
var fs = require('fs');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

var http = require('http');
// var multer  = require('multer')
// var upload = multer()

// router.use(bodyParser.json()); // support json encoded bodies, for parsing application/json

router.use(bodyParser.urlencoded({ extended: true }))
.post('/', function (req, res) {
	
	var body = req.body.txt;
	
	var dateStr = body.split(',')[0];
	filePath = __dirname + '/../data/data_' + dateStr.substring(0, 13) + '.txt';
	console.log("open file "+ filePath);

	fs.appendFile(filePath, body + '\n', function(err) {
		if (err) {
			console.error(err);
			return;
		}
		console.log("append to file");
		res.send("Upload success. "+ body);
		//fs.close(fd);
	});
});

// app.listen(8888);
module.exports = router;
