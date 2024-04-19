const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mqtt = require("mqtt");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const mqttclient = mqtt.connect('mqtt://broker.hivemq.com:1883');

const topic = 'home/temperature';

app.use(express.static('public'));

mqttclient.on('connect', () => {
    console.log('MQTT client connected to the broker');
    mqttclient.subscribe(topic);
});

mqttclient.on('messsage', (topic, message) => {
    console.log(`Received the message from ${topic}: ${message.toString()}`);
    io.emit('mqtt_message', message.toString());
});

io.on('connection', (socket) => {
    console.log(`A user is connected`);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})