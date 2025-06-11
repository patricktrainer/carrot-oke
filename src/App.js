import React, { useState } from 'react';
import './App.css';
import MusicPlayer from './MusicPlayer';
import AssetStatus from './components/AssetStatus';
import { AUDIO_PATHS } from './utils/assets';

// Karaoke songs data
const sampleSongs = [
  {
    title: "Root Vegetable Rap Battle",
    artist: "Carrot-Oke",
    url: AUDIO_PATHS.RAP_BATTLE
  },
  {
    title: "Don't Stop Be-leafing",
    artist: "Carrot-Oke",
    url: AUDIO_PATHS.BELEAFING
  },
  {
    title: "Electronic Carrot Dreams",
    artist: "Carrot-Oke",
    url: AUDIO_PATHS.ELECTRONIC
  }
];

// Lyrics for Root Vegetable Rap Battle
const rapBattleLyrics = [
  { time: 0, text: "[Verse 1 - Carrot]" },
  { time: 1, text: "Orange-tipped soldier, roots in the ground" },
  { time: 4, text: "Crunch so loud, I make the earth pound" },
  { time: 6, text: "Beta-carotene king, I'm sharper than a spear" },
  { time: 8, text: "When I'm in the stew, you know the flavor's clear" },
  { time: 12, text: "[Verse 2 - Beet]" },
  { time: 14, text: "Beet's in the house, crimson crown glowin'" },
  { time: 16, text: "Earthy undertone, got the juices flowin'" },
  { time: 18, text: "I stain the game, leave marks so deep" },
  { time: 20, text: "Carrot, step aside—this dirt runs steep" },
  { time: 24, text: "[Chorus]" },
  { time: 26, text: "Root to root, who's the best of the bunch?" },
  { time: 28, text: "Clash underground, who's bringing the crunch?" },
  { time: 30, text: "Veggie vibes strong, hear the soil erupt" },
  { time: 32, text: "Root rap battle, who's the one that's tough?" }
];

// Lyrics for Don't Stop Be-leafing
const beleafingLyrics = [
  { time: 0, text: "[Verse]" },
  { time: 2, text: "Roots in the ground searching for the sun" },
  { time: 4, text: "Veggie hearts beating dreaming of the run" },
  { time: 6, text: "Photosynthesizing reaching for the sky" },
  { time: 8, text: "Leaves whisper softly we were born to try" },
  { time: 12, text: "[Chorus]" },
  { time: 14, text: "Don't stop be-leafing hold on to the green" },
  { time: 16, text: "Grow through the darkness chase what you've seen" },
  { time: 18, text: "Veggie dreams rising breaking through the seams" },
  { time: 20, text: "Don't stop be-leafing life's more than it seems" }
];

// Lyrics for Electronic Carrot Dreams
const electronicLyrics = [
  { time: 0, text: "[Verse]" },
  { time: 2, text: "In a garden under the moon's glow" },
  { time: 4, text: "A carrot danced putting on a show" },
  { time: 6, text: "Beats were bouncing the soil shook" },
  { time: 8, text: "Dreams of veggies in every nook" },
  { time: 12, text: "[Chorus]" },
  { time: 14, text: "Carrot dreams in a digital stream" },
  { time: 16, text: "Veggies grooving in an endless theme" },
  { time: 18, text: "Beep boop beats and a crispy crunch" },
  { time: 20, text: "Dancing wild in a veggie brunch" }
];

// All lyrics organized by song
const allLyrics = [
  rapBattleLyrics,
  beleafingLyrics,
  electronicLyrics
];

function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const handleSongChange = (newIndex) => {
    setCurrentSongIndex(newIndex);
  };

  const handleLyricsSync = (lyricData) => {
    console.log('Current lyric:', lyricData.text);
    // You can add additional logic here for karaoke scoring, etc.
  };

  return (
    <div className="App">
      
      <header className="app-header">
        <h1>🎤 Carrot-Oke 🥕</h1>
        <p>Your Ultimate Karaoke Experience</p>
      </header>
      
      <main className="app-main">
        <MusicPlayer
          songList={sampleSongs}
          currentSongIndex={currentSongIndex}
          onSongChange={handleSongChange}
          showLyrics={true}
          lyrics={allLyrics[currentSongIndex]}
          onLyricsSync={handleLyricsSync}
        />
        
        <div className="instructions">
          <h2>🎵 How to Use</h2>
          <ul>
            <li>🎵 Select a song from the queue</li>
            <li>▶️ Use the play/pause controls</li>
            <li>🔊 Adjust volume to your liking</li>
            <li>📍 Click the progress bar to seek</li>
            <li>🎤 Follow the highlighted lyrics</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
