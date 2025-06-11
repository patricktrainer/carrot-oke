import React, { useState, useRef, useEffect, useCallback } from 'react';
import './MusicPlayer.css';
import SingingCarrot from './components/SingingCarrot';

const MusicPlayer = ({ 
  songList = [], 
  currentSongIndex = 0, 
  onSongChange,
  showLyrics = true,
  lyrics = [],
  onLyricsSync
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);
  const audioRef = useRef(null);

  const currentSong = songList[currentSongIndex];

  // Update audio source when song changes
  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.src = currentSong.url;
      audioRef.current.load();
      setCurrentTime(0);
      setCurrentLyricIndex(-1);
    }
  }, [currentSong]);

  // Time update handler
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      
      // Sync lyrics with current time
      if (lyrics.length > 0) {
        const currentLyric = lyrics.findIndex((lyric, index) => {
          const nextLyric = lyrics[index + 1];
          return audio.currentTime >= lyric.time && 
                 (!nextLyric || audio.currentTime < nextLyric.time);
        });
        
        if (currentLyric !== -1 && currentLyric !== currentLyricIndex) {
          setCurrentLyricIndex(currentLyric);
          if (onLyricsSync) {
            onLyricsSync(lyrics[currentLyric]);
          }
        }
      }
    };

    const updateDuration = () => {
      setDuration(audio.duration || 0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleNext);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleNext);
    };
  }, [lyrics, currentLyricIndex, onLyricsSync, handleNext]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    const prevIndex = currentSongIndex > 0 ? currentSongIndex - 1 : songList.length - 1;
    if (onSongChange) {
      onSongChange(prevIndex);
    }
  };

  const handleNext = useCallback(() => {
    const nextIndex = currentSongIndex < songList.length - 1 ? currentSongIndex + 1 : 0;
    if (onSongChange) {
      onSongChange(nextIndex);
    }
  }, [currentSongIndex, songList.length, onSongChange]);

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="music-player">
      <audio ref={audioRef} />
      
      {/* Song Info */}
      <div className="song-info">
        <div className="song-title">
          {currentSong ? currentSong.title : 'No song selected'}
        </div>
        <div className="song-artist">
          {currentSong ? currentSong.artist : ''}
        </div>
      </div>

      {/* Singing Carrot Animation */}
      <SingingCarrot 
        isPlaying={isPlaying} 
        currentTime={currentTime} 
        songTitle={currentSong?.title}
        currentLyric={currentLyricIndex >= 0 ? lyrics[currentLyricIndex]?.text : ''}
      />

      {/* Progress Bar */}
      <div className="progress-container">
        <span className="time-display">{formatTime(currentTime)}</span>
        <div className="progress-bar" onClick={handleSeek}>
          <div 
            className="progress-fill"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <span className="time-display">{formatTime(duration)}</span>
      </div>

      {/* Controls */}
      <div className="controls">
        <button 
          className="control-btn previous-btn"
          onClick={handlePrevious}
          disabled={songList.length <= 1}
        >
          ⏮
        </button>
        
        <button 
          className="control-btn play-pause-btn"
          onClick={togglePlay}
          disabled={!currentSong}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        
        <button 
          className="control-btn next-btn"
          onClick={handleNext}
          disabled={songList.length <= 1}
        >
          ⏭
        </button>
      </div>

      {/* Volume Control */}
      <div className="volume-control">
        <span className="volume-icon">🔊</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
      </div>

      {/* Lyrics Display */}
      {showLyrics && lyrics.length > 0 && (
        <div className="lyrics-container">
          <h3>Lyrics</h3>
          <div className="lyrics-display">
            {lyrics.map((lyric, index) => (
              <div
                key={index}
                className={`lyric-line ${
                  index === currentLyricIndex ? 'current-lyric' : ''
                } ${
                  index < currentLyricIndex ? 'past-lyric' : ''
                }`}
              >
                {lyric.text}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Song Queue */}
      {songList.length > 1 && (
        <div className="song-queue">
          <h3>Queue</h3>
          <div className="queue-list">
            {songList.map((song, index) => (
              <div
                key={index}
                className={`queue-item ${
                  index === currentSongIndex ? 'current-queue-item' : ''
                }`}
                onClick={() => onSongChange && onSongChange(index)}
              >
                <div className="queue-song-title">{song.title}</div>
                <div className="queue-song-artist">{song.artist}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
