var express = require('express');
var fs = require('fs');

var exec = require('child_process').exec;
var router = express.Router();

router.get('/', function(req, res) {
	console.log(('method: ' + req.query.method));
	console.log(('time: ' + req.query.time));
	var method = req.query.method;
	var time = req.query.time;
	if (time == undefined)
	{
		time = (new Date()).toISOString().substring(0, 13);
	}

	var filePath = __dirname + '/../models/' + method + '.r';
	fs.stat(filePath, function (err, stats) {
		if (err)
		{
			console.log(err);
			res.status(404).send('Sorry, we cannot find that!');
			return;
		}
		filePath = __dirname + '/../data/data_' + time + '.txt';
		fs.stat(filePath, function (err, stats) {
			if (err)
			{
				console.log(err);
				res.status(404).send('Sorry, we cannot find that!');
				return;
			}
			res.writeHead(200, {'Content-Type': 'text/json'});
			var child = exec('Rscript models/callMethod.r '+ method+' '+ time, function(error, stdout, stderr) {

				//console.log('stdout: ' + stdout);

				console.log('stderr: ' + stderr);

				if (error !== null) {

					console.log('exec error: ' + error);
					return;
				}

				res.write(stdout);

				res.end();

			});
		});
	});

});

module.exports = router;
