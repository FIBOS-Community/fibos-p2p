const fs = require('fs');

module.exports = function(d) {

	let producers = d.fibos.getTableRowsSync({
		json: true,
		code: "producerjson",
		scope: "producerjson",
		table: "producerjson",
		limit: 500
	});
	let p2pddress = [];
	producers.rows.forEach((d) => {
		const owner = d.owner;
		let producer = JSON.parse(d.json);
		console.log(producer)

		producer.nodes.forEach(r => {
			if (r.p2p_endpoint && p2pddress.indexOf(r.p2p_endpoint) == -1) p2pddress.push(r.p2p_endpoint);
		});
	})

	fs.writeFile("p2p.json", JSON.stringify(p2pddress));
}