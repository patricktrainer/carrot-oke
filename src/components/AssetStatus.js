import React, { useState, useEffect } from 'react';
import { AUDIO_PATHS, IMAGE_PATHS } from '../utils/assets';
import { testAudioLoad, testImageLoad } from '../utils/assetLoader';

const AssetStatus = ({ showDetails = false }) => {
  const [audioStatus, setAudioStatus] = useState({});
  const [imageStatus, setImageStatus] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAssets = async () => {
      setLoading(true);
      
      // Test audio files
      const audioResults = {};
      for (const [key, path] of Object.entries(AUDIO_PATHS)) {
        try {
          await testAudioLoad(path);
          audioResults[key] = { status: 'success', path };
        } catch {
          audioResults[key] = { status: 'error', path };
        }
      }
      setAudioStatus(audioResults);
      
      // Test image files
      const imageResults = {};
      for (const [key, path] of Object.entries(IMAGE_PATHS)) {
        if (Array.isArray(path)) {
          // Handle CARROT_FRAMES array
          const frameResults = [];
          for (const framePath of path) {
            try {
              await testImageLoad(framePath);
              frameResults.push({ status: 'success', path: framePath });
            } catch {
              frameResults.push({ status: 'error', path: framePath });
            }
          }
          imageResults[key] = frameResults;
        } else {
          try {
            await testImageLoad(path);
            imageResults[key] = { status: 'success', path };
          } catch {
            imageResults[key] = { status: 'error', path };
          }
        }
      }
      setImageStatus(imageResults);
      
      setLoading(false);
    };

    checkAssets();
  }, []);

  if (!showDetails) return null;

  const hasErrors = 
    Object.values(audioStatus).some(item => item.status === 'error') ||
    Object.values(imageStatus).some(item => 
      Array.isArray(item) 
        ? item.some(frame => frame.status === 'error')
        : item.status === 'error'
    );

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: hasErrors ? '#ff6b6b' : '#51cf66',
      color: 'white',
      padding: '10px',
      borderRadius: '8px',
      fontSize: '12px',
      maxWidth: '300px',
      zIndex: 1000,
      fontFamily: 'monospace'
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
        Asset Status {loading ? '(Loading...)' : hasErrors ? '❌' : '✅'}
      </div>
      
      {!loading && (
        <>
          <div style={{ marginBottom: '5px' }}>
            <strong>Audio Files:</strong>
          </div>
          {Object.entries(audioStatus).map(([key, status]) => (
            <div key={key} style={{ fontSize: '10px', marginLeft: '8px' }}>
              {status.status === 'success' ? '✅' : '❌'} {key}
            </div>
          ))}
          
          <div style={{ marginBottom: '5px', marginTop: '8px' }}>
            <strong>Images:</strong>
          </div>
          {Object.entries(imageStatus).map(([key, status]) => (
            <div key={key} style={{ fontSize: '10px', marginLeft: '8px' }}>
              {Array.isArray(status) ? (
                <div>
                  {key}: {status.every(frame => frame.status === 'success') ? '✅' : '❌'}
                </div>
              ) : (
                <div>
                  {status.status === 'success' ? '✅' : '❌'} {key}
                </div>
              )}
            </div>
          ))}
          
          {hasErrors && (
            <div style={{ marginTop: '8px', fontSize: '10px', opacity: 0.9 }}>
              Check browser console for details
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AssetStatus;
