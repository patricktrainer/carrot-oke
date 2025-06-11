// Fallback audio data in case external files don't load
export const FALLBACK_SONGS = [
  {
    title: "Demo Song 1",
    artist: "Carrot-Oke",
    url: "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmIcBjyU2e2/dSgELYPV8+WTP"
  }
];

// Audio loading test function
export const testAudioLoad = (url) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    
    const onLoad = () => {
      audio.removeEventListener('canplaythrough', onLoad);
      audio.removeEventListener('error', onError);
      resolve(true);
    };
    
    const onError = () => {
      audio.removeEventListener('canplaythrough', onLoad);
      audio.removeEventListener('error', onError);
      reject(false);
    };
    
    audio.addEventListener('canplaythrough', onLoad);
    audio.addEventListener('error', onError);
    
    audio.src = url;
    audio.load();
    
    // Timeout after 5 seconds
    setTimeout(() => {
      audio.removeEventListener('canplaythrough', onLoad);
      audio.removeEventListener('error', onError);
      reject(false);
    }, 5000);
  });
};

// Image loading test function
export const testImageLoad = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => resolve(true);
    img.onerror = () => reject(false);
    
    img.src = url;
    
    // Timeout after 3 seconds
    setTimeout(() => reject(false), 3000);
  });
};
