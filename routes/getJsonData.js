var express = require('express');
var fs = require('fs');
var router = express.Router();
var exec = require('child_process').exec;


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
		//var child = exec('pwd', function(error, stdout, stderr) {
		var child = exec('Rscript models/getJsonData.r '+ dateStr, function(error, stdout, stderr) {

			console.log('stdout: ' + stdout);

			console.log('stderr: ' + stderr);

			if (error !== null) {

				console.log(error);
				res.status(500).send({ error: 'something blew up' });
			return;
			}

			res.set('Content-Type', 'text/json');
			res.write(stdout);

			res.end();

		});
	});
	
});

module.exports = router;
