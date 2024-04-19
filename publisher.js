const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

const topics = ['homeAnt/temperature', 'homeAnt/humidity', 'homeAnt/lighting'];
const interval = 5000; // publish every 5 seconds

client.on("connect", () => {
  console.log("Publisher Connected to MQTT broker");

  setInterval(() => {
    const randomTopicIndex = Math.floor(Math.random() * topics.length);
    const topic = topics[randomTopicIndex];
    let message;

    switch (topic) {
      case 'homeAnt/temperature':
        message = JSON.stringify({
          temperature: (Math.random() * 30).toFixed(2),
        });
        break;
      case 'homeAnt/humidity':
        message = JSON.stringify({
          humidity: (Math.random() * 100).toFixed(2),
        });
        break;
      case 'homeAnt/lighting':
        const lightSettings = ["dim", "bright", "off", "flashing", "disco"];
        message = JSON.stringify({
          lighting: lightSettings[Math.floor(Math.random() * lightSettings.length)],
        });
        break;
    }
    client.publish(topic, message);
    console.log(`Message set to ${topic}: ${message}`);
  }, interval);
});
