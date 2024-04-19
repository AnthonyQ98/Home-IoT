const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mqtt = require("mqtt");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const mqttclient = mqtt.connect('mqtt://broker.hivemq.com:1883');

const topic = ['homeAnt/temperature', 'homeAnt/humidity', 'homeAnt/lighting'];

app.use(express.static('public'));

mqttclient.on('connect', () => {
    console.log('MQTT client connected to the broker');
    mqttclient.subscribe(topic);
});

mqttclient.on('message', (topic, message) => {
    console.log(`Received the message from ${topic}: ${message.toString()}`);
    switch (topic) {
        case "homeAnt/temperature":
            handleTemperature(message.toString());
            io.emit('homeAnt/temperature', message.toString());
            break;
        case "homeAnt/humidity":
            handleHumidity(message.toString());
            io.emit('homeAnt/humidity', message.toString());
            break;
        case "homeAnt/lighting":
            handleLighting(message.toString());
            io.emit('homeAnt/lighting', message.toString());
            break;
        default:
            console.log("Unknown topic");
    }
});

function handleTemperature(data) {
    console.log(`Handling temperature data: ${data}`)
}

function handleHumidity(data) {
    console.log(`Handling humidity data: ${data}`)
}

function handleLighting(data) {
    console.log(`Handling lighting data: ${data}`)
}

io.on('connection', (socket) => {
    console.log(`A user is connected`);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})