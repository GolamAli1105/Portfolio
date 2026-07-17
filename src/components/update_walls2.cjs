const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'House.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// The pastel green was too subtle and looked white under lighting.
// The blue #aaccff was also default.
// Let's use a rich, distinct sage green or soft blue.
const realRoomColor = '#94a89a'; // distinctly sage green

// Replace all the previous subtle colors and the default blues
content = content.replace(/color="#dce4dd"/g, `color="${realRoomColor}"`);
content = content.replace(/color="#aaccff"/g, `color="${realRoomColor}"`);
content = content.replace(/color="#dddddd"/g, `color="${realRoomColor}"`); // Wand1_Plane006-Mesh_2 etc.
content = content.replace(/color="#f5f2eb"/g, `color="${realRoomColor}"`); // just in case any were left

fs.writeFileSync(filePath, content, 'utf8');
console.log("Walls repainted decisively.");
