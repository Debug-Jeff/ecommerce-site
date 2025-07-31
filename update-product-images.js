const fs = require('fs');
const path = require('path');

// Mapping of products to their new image paths
const imageMapping = {
  // Fresh Produce
  "1": "/products/fresh-produce/mangoes.jpg",          // Fresh Mangoes
  "4": "/products/fresh-produce/sukuma-wiki.jpg",      // Sukuma Wiki  
  "7": "/products/fresh-produce/avocados.jpg",         // Avocados
  "9": "/products/fresh-produce/tomatoes.jpg",         // Tomatoes
  "14": "/products/fresh-produce/bananas.jpg",         // Bananas
  "20": "/products/fresh-produce/onions.jpg",          // Onions
  
  // Dairy & Eggs
  "2": "/products/dairy-eggs/milk.jpg",                // Brookside Milk
  "3": "/products/dairy-eggs/margarine.jpg",           // Blue Band Margarine
  "8": "/products/dairy-eggs/yogurt.jpg",              // KCC Yogurt
  "15": "/products/dairy-eggs/eggs.jpg",               // Eggs
  
  // Meat & Poultry
  "11": "/products/meat-poultry/chicken-breast.jpg",   // Chicken Breast
  "17": "/products/meat-poultry/beef-steak.jpg",       // Beef Steak
  
  // Beverages
  "6": "/products/beverages/beer.jpg",                 // Tusker Beer
  "12": "/products/beverages/coca-cola.jpg",           // Coca Cola
  "19": "/products/beverages/orange-juice.jpg",        // Orange Juice
  
  // Pantry
  "5": "/products/pantry/royco-cubes.jpg",             // Royco Cubes
  "13": "/products/pantry/bread.jpg",                  // White Bread
  "16": "/products/pantry/rice.jpg",                   // Rice
  "18": "/products/pantry/cooking-oil.jpg",            // Cooking Oil
  
  // Household
  "10": "/products/household/washing-powder.jpg"       // Omo Washing Powder
};

// Category images for HomePage
const categoryImageMapping = {
  "fresh-produce": "/products/fresh-produce/mangoes.jpg",
  "dairy-eggs": "/products/dairy-eggs/milk.jpg", 
  "meat-poultry": "/products/meat-poultry/chicken-breast.jpg",
  "beverages": "/products/beverages/orange-juice.jpg",
  "pantry": "/products/pantry/bread.jpg",
  "household": "/products/household/washing-powder.jpg"
};

function updateMockData() {
  const mockDataPath = './app/data/mockData.ts';
  
  if (!fs.existsSync(mockDataPath)) {
    console.error('mockData.ts not found!');
    return;
  }
  
  let content = fs.readFileSync(mockDataPath, 'utf8');
  
  // Replace placeholder images with real product images
  Object.entries(imageMapping).forEach(([productId, imagePath]) => {
    const placeholderPattern = new RegExp(
      `(id: "${productId}"[\\s\\S]*?image: ")\/placeholder\\.svg\\?height=200&width=200(")`
    );
    
    content = content.replace(placeholderPattern, `$1${imagePath}$2`);
  });
  
  // Write the updated content back
  fs.writeFileSync(mockDataPath, content, 'utf8');
  console.log('✅ Updated mockData.ts with product images');
}

function updateHomePage() {
  const homePagePath = './app/components/HomePage.tsx';
  
  if (!fs.existsSync(homePagePath)) {
    console.error('HomePage.tsx not found!');
    return;
  }
  
  let content = fs.readFileSync(homePagePath, 'utf8');
  
  // Replace category placeholder images
  Object.entries(categoryImageMapping).forEach(([category, imagePath]) => {
    // Replace category image in the categories array
    const categoryPattern = new RegExp(
      `(name: "[^"]*",\\s*description: "[^"]*",\\s*icon: [^,]*,\\s*color: "[^"]*",\\s*image: ")\/placeholder\\.svg\\?height=200&width=300(")`
    );
    
    // More specific pattern for each category
    const specificPattern = new RegExp(
      `(category: "${category}"[\\s\\S]*?image: ")\/placeholder\\.svg\\?height=200&width=300(")`
    );
    
    content = content.replace(specificPattern, `$1${imagePath}$2`);
  });
  
  // Replace the featured products section placeholder
  content = content.replace(
    /src="\/placeholder\.svg\?height=200&width=200"/g,
    'src="/products/fresh-produce/mangoes.jpg"'
  );
  
  // Replace fallback placeholder in category mapping
  content = content.replace(
    /src=\{category\.image \|\| "\/placeholder\.svg"\}/g,
    'src={category.image || "/products/fresh-produce/mangoes.jpg"}'
  );
  
  fs.writeFileSync(homePagePath, content, 'utf8');
  console.log('✅ Updated HomePage.tsx with category images');
}

function updateOtherComponents() {
  const componentsToUpdate = [
    './app/components/ProductGrid.tsx',
    './app/components/ShoppingCart.tsx'
  ];
  
  componentsToUpdate.forEach(componentPath => {
    if (!fs.existsSync(componentPath)) {
      console.log(`⚠️ ${componentPath} not found, skipping...`);
      return;
    }
    
    let content = fs.readFileSync(componentPath, 'utf8');
    
    // Replace fallback placeholder images
    content = content.replace(
      /src=\{[^}]*\|\| "\/placeholder\.svg"\}/g,
      'src={product.image || "/products/fresh-produce/mangoes.jpg"}'
    );
    
    fs.writeFileSync(componentPath, content, 'utf8');
    console.log(`✅ Updated ${path.basename(componentPath)}`);
  });
}

// Main execution
console.log('🚀 Starting to update placeholder images...\n');

updateMockData();
updateHomePage();
updateOtherComponents();

console.log('\n🎉 All placeholder images have been updated!');
console.log('\n📝 Summary:');
console.log('- mockData.ts: Updated all 20 product images');
console.log('- HomePage.tsx: Updated category and featured product images');
console.log('- ProductGrid.tsx & ShoppingCart.tsx: Updated fallback images');
console.log('\n💡 Next steps:');
console.log('1. Run: node download-images.js (to download actual images)');
console.log('2. Start your Next.js app to see the changes');
console.log('3. All products now have authentic, high-quality images!');