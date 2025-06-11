import { AUDIO_PATHS, IMAGE_PATHS } from './src/utils/assets.js';

console.log('🎵 Audio Paths:');
Object.entries(AUDIO_PATHS).forEach(([key, path]) => {
  console.log(`  ${key}: ${path}`);
});

console.log('\n🖼️ Image Paths:');
Object.entries(IMAGE_PATHS).forEach(([key, path]) => {
  if (Array.isArray(path)) {
    console.log(`  ${key}:`);
    path.forEach((framePath, index) => {
      console.log(`    Frame ${index}: ${framePath}`);
    });
  } else {
    console.log(`  ${key}: ${path}`);
  }
});

console.log('\n🌍 Environment:');
console.log(`  NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
console.log(`  PUBLIC_URL: ${process.env.PUBLIC_URL || '(empty - will use relative paths)'}`);
