const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'House.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace default ugly colors with realistic ones

// Wood / Cabinets / Bed
content = content.replace(/color="#8B4513"/g, 'color="#3e2723" roughness={0.9} metalness={0.05}'); // Dark Walnut

// Table top
content = content.replace(/geometry={nodes\.Tischplatte_Cube002\.geometry} >\s*<meshStandardMaterial color="#aaccff"/, 'geometry={nodes.Tischplatte_Cube002.geometry} >\n        <meshStandardMaterial color="#fafafa"');

// Bright Blue Cup
content = content.replace(/geometry={nodes\.Cylinder001_Cylinder007\.geometry} >\s*<meshStandardMaterial color="#0000ff"/, 'geometry={nodes.Cylinder001_Cylinder007.geometry} >\n        <meshStandardMaterial color="#2c3e50" roughness={0.2} metalness={0.5}');

// Bright Red Cup
content = content.replace(/geometry={nodes\.Cylinder_Cylinder006\.geometry} >\s*<meshStandardMaterial color="#ff0000"/, 'geometry={nodes.Cylinder_Cylinder006.geometry} >\n        <meshStandardMaterial color="#c0392b" roughness={0.2} metalness={0.5}');

// Wooden Floor
content = content.replace(/geometry={nodes\.Boden1_Plane005\.geometry} >\s*<meshStandardMaterial color="#A0522D"/, 'geometry={nodes.Boden1_Plane005.geometry} >\n        <meshStandardMaterial color="#5d4037" roughness={0.3} metalness={0.1}'); // Polished wood floor

// Rug
content = content.replace(/geometry={nodes\.Teppich_Plane002\.geometry} >\s*<meshStandardMaterial color="#888888"/, 'geometry={nodes.Teppich_Plane002.geometry} >\n        <meshStandardMaterial color="#1a237e" roughness={1.0} metalness={0.0}'); // Navy blue rug

// Grey walls / panels to warm off-white
content = content.replace(/color="#cccccc"/g, 'color="#f5f2eb"'); 
content = content.replace(/color="#f0f0f0"/g, 'color="#f5f2eb"');

// Bright pure white to warm white
// Note: We don't want to replace all white, but let's make it a bit warmer
content = content.replace(/color="#ffffff"/g, 'color="#f5f5f5"');

// Table legs / black stands -> Metal
content = content.replace(/geometry={nodes\.Ständer2_Cube005\.geometry} >\s*<meshStandardMaterial color="#000000"/, 'geometry={nodes.Ständer2_Cube005.geometry} >\n        <meshStandardMaterial color="#111111" roughness={0.3} metalness={0.8}');
content = content.replace(/geometry={nodes\.Tischbein_Cube001\.geometry} >\s*<meshStandardMaterial color="#8B4513"/, 'geometry={nodes.Tischbein_Cube001.geometry} >\n        <meshStandardMaterial color="#111111" roughness={0.3} metalness={0.8}'); // We already replaced #8B4513 above, so this regex won't match if it was replaced. 
// Actually, I replaced #8B4513 globally above. Let's fix the table leg specifically:
content = content.replace(/geometry={nodes\.Tischbein_Cube001\.geometry} >\s*<meshStandardMaterial color="#3e2723" roughness=\{0\.9\} metalness=\{0\.05\}/, 'geometry={nodes.Tischbein_Cube001.geometry} >\n        <meshStandardMaterial color="#111111" roughness={0.3} metalness={0.8}');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Colors updated.");
