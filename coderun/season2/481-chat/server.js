const path = require("path");
const serverSubset = require(path.resolve("./subset.json"));


const WebSocketServer = new require('ws');
let CLIENT = null;

const wait = (data, delay = 100) => setTimeout(() => CLIENT.send(JSON.stringify(data)), delay);

const sendAsyncMessages = () => {
    serverSubset.data.map((el, i) => wait(el, i+100))
}

const webSocketServer = new WebSocketServer.Server({
    port: 8081
});

let isRefreshServer = true;
webSocketServer.on('connection', function(ws) {
    CLIENT = ws;
    console.log("connect");

    if (isRefreshServer) {
        sendAsyncMessages()
        isRefreshServer = false
    }

    ws.on('close', function() {
        console.log('disconnect');
        CLIENT = null
        isRefreshServer = false
    });

});
