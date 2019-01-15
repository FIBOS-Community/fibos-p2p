const fs = require('fs');
module.exports = function(d) {

	const ctx = d.fibos.contractSync("producerjson");
	const filepath = '../producerjson/' + d.producername + '.json';

	const producerjson = require(filepath);
	var result = ctx.setSync({
		"owner": d.producername,
		"json": JSON.stringify(producerjson)
	}, {
		"authorization": d.producername
	});

	console.log(result);
}