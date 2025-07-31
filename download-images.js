const https = require('https');
const fs = require('fs');
const path = require('path');

// Create directory structure
const baseDir = './public/products';
const categories = [
  'fresh-produce',
  'dairy-eggs', 
  'meat-poultry',
  'beverages',
  'pantry',
  'household'
];

categories.forEach(category => {
  const dir = path.join(baseDir, category);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Sample high-quality product images from free sources
const sampleImages = {
  'fresh-produce/mangoes.jpg': 'https://images.unsplash.com/photo-1605664515962-6e8e7924bd33?w=800&q=80',
  'fresh-produce/avocados.jpg': 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80',
  'fresh-produce/tomatoes.jpg': 'https://images.unsplash.com/photo-1546470427-e5293e5b7b36?w=800&q=80',
  'fresh-produce/bananas.jpg': 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&q=80',
  'fresh-produce/onions.jpg': 'https://images.unsplash.com/photo-1508313880080-c4bef43d1e9c?w=800&q=80',
  'fresh-produce/sukuma-wiki.jpg': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&q=80',
  
  'dairy-eggs/milk.jpg': 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&q=80',
  'dairy-eggs/margarine.jpg': 'https://images.unsplash.com/photo-1586985289906-406988974504?w=800&q=80',
  'dairy-eggs/yogurt.jpg': 'https://images.unsplash.com/photo-1571212515416-37ffeeef6c6d?w=800&q=80',
  'dairy-eggs/eggs.jpg': 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=800&q=80',
  
  'meat-poultry/chicken-breast.jpg': 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&q=80',
  'meat-poultry/beef-steak.jpg': 'https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=800&q=80',
  
  'beverages/beer.jpg': 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&q=80',
  'beverages/coca-cola.jpg': 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=800&q=80',
  'beverages/orange-juice.jpg': 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=800&q=80',
  
  'pantry/bread.jpg': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
  'pantry/rice.jpg': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80',
  'pantry/cooking-oil.jpg': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80',
  'pantry/royco-cubes.jpg': 'https://images.unsplash.com/photo-1599251454150-790a5409f50e?w=800&q=80',
  
  'household/washing-powder.jpg': 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80'
};

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const fullPath = path.join(baseDir, filepath);
    const dir = path.dirname(fullPath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const file = fs.createWriteStream(fullPath);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded: ${filepath}`);
          resolve();
        });
      } else {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function downloadAllImages() {
  console.log('Starting image downloads...');
  
  for (const [filepath, url] of Object.entries(sampleImages)) {
    try {
      await downloadImage(url, filepath);
      // Add delay to be respectful to the server
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Error downloading ${filepath}:`, error.message);
    }
  }
  
  console.log('Image downloads completed!');
}

downloadAllImages().catch(console.error);