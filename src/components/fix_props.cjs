const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'House.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Fix duplicated roughness and metalness props
content = content.replace(/roughness=\{([0-9.]+)\}\s*metalness=\{([0-9.]+)\}\s*roughness=\{([0-9.]+)\}\s*metalness=\{([0-9.]+)\}/g, 'roughness={$1} metalness={$2}');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Duplicates fixed.");
