const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.hivemq.com:1833");
 
const topic = "home/temperature";
const interval = 5000; //publish every 5 seconds
 
client.on("connect", () => {
  console.log("Publisher Connected to MQTT broker");
  setInterval(() => {
    const message = JSON.stringify({
      temperature: (Math.random() * 30).toFixed(2),
    });
 
    client.publish(topic, message);
    console.log(`Message set to ${topic}: ${message}`);
  }, interval);
});
 