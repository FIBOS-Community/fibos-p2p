module.exports = function(d) {
	var ctx = d.fibos.contractSync("producerjson");
	var result = ctx.delSync({
		"owner": d.producername
	}, {
		"authorization": d.producername
	})

	console.log(result);
};