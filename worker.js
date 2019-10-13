// Sample worker based on https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker

let count = 0;

const { Console } = require("console");
self.console = new Console({ stdout: process.stdout, stderr: process.stderr });

console.log("SharedWorker loading")

onconnect = function(e) {
    var port = e.ports[0];
    console.log("SharedWorker connecting");

    port.addEventListener('message', function(e) {
        var workerResult = `Result ${count++}: ` + e.data;
        console.log("SharedWorker posting:", workerResult);
        port.postMessage(workerResult);
    });

    port.start();
}
