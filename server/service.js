const express = require('express')
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 3001

// Use bodyParser middleware to parse JSON
app.use(bodyParser.json());

// Use cors middleware to enable CORS
app.use(cors());

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

// Get all rooms
app.get('/house', (req, res) => {
  fs.readFile('house.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
  
    const houseData = JSON.parse(data);
    // const rooms = houseData.rooms;
  
    res.json(houseData);
  });
});

// Update room by ID
app.put('/rooms/:id', (req, res) => {
  fs.readFile('house.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
  
    const houseData = JSON.parse(data);
    const rooms = houseData.rooms;
  
    const roomId = parseInt(req.params.id);
    const { brightness, light, temperature } = req.body;

    // Find the room with the specified ID
    const room = rooms.find((room) => room.id === roomId);

    if (!room) {
      res.status(404).json({ error: 'Room not found' });
    } else {
      // Update the room's properties if provided in the request body
      if (brightness !== undefined) {
        room.brightness = brightness;
      }
      if (light !== undefined) {
        room.light = light;
      }
      if (temperature !== undefined) {
        room.temperature = temperature;
      }

      // Update the data in the house.json file
      fs.writeFileSync('house.json', JSON.stringify({ rooms }));

      res.json(room);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});