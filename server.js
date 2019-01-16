const fibos = require('fibos');
const fs = require("fs");
const config = require('./config');
const p2paddress = require('./p2p.json');
const p2powner = require('./p2powner.json');
console.notice("start FIBOS seed node");


fibos.config_dir = config.config_dir;
fibos.data_dir = config.data_dir;

console.notice("config_dir:", fibos.config_dir);
console.notice("data_dir:", fibos.data_dir);


fibos.load("http", {
	"http-server-address": "127.0.0.1:8870",
	"access-control-allow-origin": "*",
	"http-validate-host": false,
	"verbose-http-errors": true //打开报错
});


fibos.load("net", {
	"p2p-peer-address": p2paddress,
	"max-clients": 100,
	"agent-name": "FIBOS Seed"
});

fibos.load("net_api");

let chain_config = {
	"contracts-console": true,
	'chain-state-db-size-mb': 8 * 1024,
};

if (!fs.exists(fibos.data_dir) && !fs.exists(fibos.config_dir)) {
	chain_config['genesis-json'] = "genesis.json";
}


fibos.load("producer", {
	// 'enable-stale-production': true,
	'max-transaction-time': 3000
});

fibos.load("chain", chain_config);
fibos.load("chain_api");

fibos.start();

// [http server]
const http = require("http");
let httpServer = new http.Server("", 8080, [
	(req) => {
		req.session = {};
	}, {
		'^/ping': (req) => {
			req.response.write("pong");
		},
		'/v1/net/connections': (req) => {

			const rep = http.post("http://127.0.0.1:8870/v1/net/connections", {
				json: {}
			});
			const checlist = rep.json();
			let message = {
				all: checlist.length,
				conneted: 0,
				connetedp2p: [],
				p2powner: {}
			};
			// console.log(checlist);
			checlist.forEach((d) => {
				if (d.last_handshake.chain_id == config.chainId) {
					message.conneted += 1;
					message.connetedp2p.push(d.peer);
				}
				message.p2powner[d.peer] = p2powner[d.peer] || "";
			});
			req.response.json(message);
		},
		"*": [function(req) {}]
	},
	function(req) {}
]);

httpServer.crossDomain = true;
httpServer.asyncRun();