const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'House.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add useTexture import
content = content.replace(
  "import { useGLTF, Text } from '@react-three/drei'", 
  "import { useGLTF, Text, useTexture } from '@react-three/drei'"
);

// 2. Add texture loading inside the House component
const textureLogic = `
  const { nodes, materials } = useGLTF('/new_house.glb')
  
  const woodTextures = useTexture({
    map: '/textures/wood/color.jpg',
    bumpMap: '/textures/wood/bump.jpg',
    roughnessMap: '/textures/wood/roughness.jpg'
  });
  
  // Wrap textures so they tile correctly instead of stretching
  useMemo(() => {
    Object.values(woodTextures).forEach(tex => {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(2, 2);
    });
  }, [woodTextures]);
`;

content = content.replace("  const { nodes, materials } = useGLTF('/new_house.glb')", textureLogic);

// 3. Replace the wood materials with textured materials
// We previously used color="#3e2723" for cabinets/bed and "#5d4037" for the floor
content = content.replace(/<meshStandardMaterial color="#3e2723"[^>]*\/>/g, '<meshStandardMaterial {...woodTextures} bumpScale={0.01} color="#aa7755" />');
content = content.replace(/<meshStandardMaterial color="#5d4037"[^>]*\/>/g, '<meshStandardMaterial {...woodTextures} bumpScale={0.01} color="#885533" />'); // slightly different tint for floor

fs.writeFileSync(filePath, content, 'utf8');
console.log("Textures applied.");
