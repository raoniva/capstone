var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/', function(req, res){
	//time format: 2015-04-08T09
	console.log(('time: ' + req.query.time))
	var dateStr = req.query.time;
	if (dateStr == undefined)
	{
		dateStr = (new Date()).toISOString().substring(0, 13);
	}
	var filePath = __dirname + '/../data/data_' + dateStr + '.txt';
	fs.stat(filePath, function (err, stats) {
		if (err)
		{
			console.log(err);
			res.status(404).send('Sorry, we cannot find that!');
			return;
		}
		res.set('Content-Type', 'text/plain');
		var readStream = fs.createReadStream(filePath);
		readStream.pipe(res);
	});
});

module.exports = router;