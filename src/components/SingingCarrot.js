import React, { useState, useEffect, useCallback } from 'react';
import './SingingCarrot.css';
import { IMAGE_PATHS } from '../utils/assets';

const SingingCarrot = ({ isPlaying, currentTime, songTitle, currentLyric }) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [wordBounce, setWordBounce] = useState(0);
  const [lastLyric, setLastLyric] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [currentWords, setCurrentWords] = useState([]);
  const [hasCompletedLine, setHasCompletedLine] = useState(false);
  
  const carrotFrames = IMAGE_PATHS.CARROT_FRAMES;

  // Split current lyric into words and animate each word
  const getWordsWithTiming = (lyricText) => {
    if (!lyricText || lyricText.startsWith('[')) return []; // Skip section headers
    const words = lyricText.split(' ');
    return words;
  };

  // Different animation speeds for different songs
  const getAnimationSpeed = useCallback(() => {
    if (songTitle?.includes('Rap Battle')) return 150; // Faster for rap
    if (songTitle?.includes('Electronic')) return 120; // Fast for electronic
    return 200; // Normal speed for ballad
  }, [songTitle]);

  // Word bounce timing based on song type
  const getWordBounceSpeed = useCallback(() => {
    if (songTitle?.includes('Rap Battle')) return 300; // 300ms per word for rap
    if (songTitle?.includes('Electronic')) return 350; // 350ms per word for electronic
    return 400; // 400ms per word for ballad
  }, [songTitle]);

  // Handle new lyric detection and visibility
  useEffect(() => {
    if (!currentLyric || !isPlaying) {
      setIsVisible(false);
      setWordBounce(0);
      setHasCompletedLine(false);
      return;
    }

    // Check if this is a new lyric line
    if (currentLyric !== lastLyric) {
      setLastLyric(currentLyric);
      setCurrentWords(getWordsWithTiming(currentLyric));
      setWordBounce(0);
      setHasCompletedLine(false);
      setIsVisible(true);
    }
  }, [currentLyric, isPlaying, lastLyric]);

  // Handle mouth animation
  useEffect(() => {
    if (!isPlaying || !isVisible) {
      setCurrentFrame(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % carrotFrames.length);
    }, getAnimationSpeed());

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, isVisible, carrotFrames.length, songTitle]);

  // Handle word bounce animation - only when visible and not completed
  useEffect(() => {
    if (!isPlaying || !isVisible || hasCompletedLine || currentWords.length === 0) {
      return;
    }

    const wordInterval = setInterval(() => {
      setWordBounce(prev => {
        const nextWord = prev + 1;
        // If we've gone through all words, hide the component
        if (nextWord >= currentWords.length) {
          setHasCompletedLine(true);
          setIsVisible(false);
          return 0;
        }
        return nextWord;
      });
    }, getWordBounceSpeed());

    return () => clearInterval(wordInterval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, hasCompletedLine, currentWords.length, isPlaying]);

  // Don't render anything if not visible
  if (!isVisible || !isPlaying || !currentLyric) {
    return null;
  }

  const bounceIntensity = currentWords.length > 0 ? 'word-bounce' : '';

  return (
    <div className="singing-carrot">
      <img 
        src={carrotFrames[currentFrame]}
        alt="Singing Carrot"
        className={`carrot-image ${isPlaying ? 'singing' : ''} ${bounceIntensity}`}
        style={{
          '--word-bounce-offset': currentWords.length > 0 ? `${wordBounce * 2}px` : '0px'
        }}
      />
      <div className="current-word-display">
        {currentWords.map((word, index) => (
          <span 
            key={index}
            className={`word ${index === wordBounce ? 'active-word' : ''} ${index < wordBounce ? 'sung-word' : ''}`}
          >
            {word}
            {index === wordBounce && (
              <img 
                src={IMAGE_PATHS.CARROT_OPEN}
                alt="Mini Carrot"
                className="mini-carrot"
              />
            )}
          </span>
        ))}
      </div>
      <div className="music-notes">
        <span className="note note-1">♪</span>
        <span className="note note-2">♫</span>
        <span className="note note-3">♪</span>
      </div>
    </div>
  );
};

export default SingingCarrot;