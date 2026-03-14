const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.next')) {
        results = results.concat(walk(file));
      }
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.css') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Replace primary color
  content = content.replace(/#F5A623/g, '#E63946');
  // Replace hover color
  content = content.replace(/#e0961f/g, '#D62828');
  // Replace specific tailwind classes
  content = content.replace(/bg-orange-50/g, 'bg-red-50');
  content = content.replace(/hover:text-orange-600/g, 'hover:text-red-600');
  content = content.replace(/to-yellow-300/g, 'to-red-300');
  content = content.replace(/--color-brand-orange/g, '--color-brand-red');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
});
