const FIBOS = require('fibos.js');
const CONFIG = require('./config.json');
const httpEndpoint = CONFIG["httpEndpoint"];

let privatekey = []
let showstring = "";


let keys = "";

while (true) {
	keys = console.readLine("input the  produce-rname:private-key!\n");
	if (keys) break;
}


let public_key = "";
let private_key = "";
keys = keys.split(":");
producername = keys[0];
privatekey = keys[1];


//联系
let fibos = FIBOS({
	chainId: CONFIG["chainId"],
	keyProvider: privatekey,
	httpEndpoint: httpEndpoint,
	logger: {
		log: null,
		error: null
	}
});

function choiceaccount() {
	console.notice("---------connect to " + httpEndpoint + "----welcome " + producername + "--------");
	choice();
}

choiceaccount();

function choice() {
	let d = {
		fibos: fibos,
		producername: producername
	}
	console.log(
`
1. create p2p file\n
2. set producerjson(/lib/setproducerjson.js)\n
3. del producerjson(/lib/delproducerjson.js)\n
`
	)
	console.notice("--------------" + producername + "------choice---------------------");
	var choiceone = Number(console.readLine("choice:"))


	switch (choiceone) {
		case 1:
			require('./lib/createp2p')(d);
			break;
		case 2:
			require('./lib/setproducerjson')(d);
			break;
		case 3:
			require('./lib/delproducerjson')(d);
			break;
	}
	console.notice("------------------End---------" + producername + "-----------------------------");
	choice();
}