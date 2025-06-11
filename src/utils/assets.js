// Asset path utility for handling GitHub Pages deployment
export const getAssetPath = (path) => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Use PUBLIC_URL for GitHub Pages compatibility
  return `${process.env.PUBLIC_URL}/${cleanPath}`;
};

// Audio file paths
export const AUDIO_PATHS = {
  RAP_BATTLE: getAssetPath('audio/Root Vegetable Rap Battle.mp3'),
  BELEAFING: getAssetPath('audio/Don\'t Stop Be-leafing.mp3'),
  ELECTRONIC: getAssetPath('audio/Electronic Carrot Dreams.mp3')
};

// Image file paths
export const IMAGE_PATHS = {
  CARROT_CLOSED: getAssetPath('carrot-closed-mouth.png'),
  CARROT_SMALL: getAssetPath('carrot-sm-mouth.png'),
  CARROT_OPEN: getAssetPath('carrot-open-mouth.png'),
  CARROT_FRAMES: [
    getAssetPath('carrot-closed-mouth.png'),
    getAssetPath('carrot-sm-mouth.png'),
    getAssetPath('carrot-open-mouth.png'),
    getAssetPath('carrot-sm-mouth.png')
  ]
};
