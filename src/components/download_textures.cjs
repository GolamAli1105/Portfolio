const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, '..', '..', 'public', 'textures', 'wood');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, function(response) {
      if (response.statusCode === 302 || response.statusCode === 301) {
          // Handle redirect
          download(response.headers.location, dest).then(resolve).catch(reject);
      } else {
          response.pipe(file);
          file.on('finish', function() {
              file.close(resolve);
          });
      }
    }).on('error', function(err) {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  const baseUrl = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/';
  await download(baseUrl + 'hardwood2_diffuse.jpg', path.join(dir, 'color.jpg'));
  await download(baseUrl + 'hardwood2_bump.jpg', path.join(dir, 'bump.jpg'));
  await download(baseUrl + 'hardwood2_roughness.jpg', path.join(dir, 'roughness.jpg'));
  console.log('Wood textures downloaded');
}

run();
