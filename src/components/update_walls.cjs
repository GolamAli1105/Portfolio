const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'House.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace warm whites with a realistic light sage green / pastel green
// Walls were set to #f5f2eb and #f5f5f5
// We will use #dce4dd (a very subtle, calming light green)
content = content.replace(/color="#f5f2eb"/g, 'color="#dce4dd"');
content = content.replace(/color="#f5f5f5"/g, 'color="#dce4dd"');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Walls updated.");
