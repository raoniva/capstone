var express = require('express');
var fs = require('fs');

	
	
	var filePath = __dirname + '/../data/simulate.txt';
	fs.stat(filePath, function (err, stats) {
		if (err)
		{
			console.log(err);
			return;
		}
		fs.readFile(filePath, 'utf8', function(err, txtData) {
			if (err)
			{
				console.log(err);
				return;
			}
			console.log(txtData);
			offset = 1;
			setInterval(function() {
				lines = txtData.split('\n');
				smp = lines[offset];
				var now = new Date();
				var dateStr = now.toISOString().substring(0, 13);
				var storePath = __dirname + '/../data/data_' + dateStr + '.txt';
				smp = now.toISOString() + "," + smp + "\n";
				offset += 1;
				if (offset + 1 > lines.length)
				{
					offset = 1;
				}
				fs.appendFile(storePath, smp, function(err) {
					if (err) {
						console.error(err);
						return;
					}
				});
			}, 1000);
		});
	});
	