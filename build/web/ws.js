
var wsUri = "ws://" + document.location.host + document.location.pathname + "chat";
var websocket = new WebSocket(wsUri);

var username;
websocket.onopen = function (evt) {
    onOpen(evt);
};
websocket.onmessage = function (evt) {
    onMessage(evt);
};
websocket.onerror = function (evt) {
    onError(evt);
};
var output = document.getElementById("output");

function join() {
    username = user.value;
    websocket.send(username + " enlazado");
    user.value = "";
}

function send_message() {
    websocket.send(username + ": " + sendchat.value);
    sendchat.value = "";
}

function onOpen() {
    writeToScreen("Conectado a " + wsUri);
}

function onMessage(evt) {
    console.log("onMessage");
    writeToScreen("RECEIVED: " + evt.data);
    if (evt.data.indexOf("enlazado") != -1) {
        userField.innerHTML += evt.data.substring(0, evt.data.indexOf("enlazado")) + "\n";
    } else {
        chatlogField.innerHTML += evt.data + "\n";
    }
}

function onError(evt) {
    writeToScreen('<span style="color:red;">ERROR:</span>' + evt.data);
}

function writeToScreen(message) {
    output.innerHTML += message + "</br>";
}