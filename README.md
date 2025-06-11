# 🎤 Carrot-Oke 🥕

A beautiful, modern karaoke application built with React featuring a retro Winamp-inspired design! Perfect for parties, events, or just having fun at home!

## 🌐 Live Demo

**[🎵 Try Carrot-Oke Live on GitHub Pages!](https://patricktrainer.github.io/carrot-oke)**

## ✨ Features

- 🎵 **Music Player**: Full-featured audio player with classic Winamp-style controls
- 🥕 **Singing Carrot**: Animated carrot mascot that sings along with the lyrics
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🎤 **Real-time Lyrics**: Synchronized lyrics display with word-by-word highlighting
- 🎶 **Song Queue**: Manage multiple songs with an intuitive queue system
- 🔊 **Volume Control**: Adjustable volume with smooth slider controls
- 🎨 **Retro UI**: Classic Winamp-inspired design with digital displays and beveled buttons
- ⏱️ **Progress Tracking**: Visual progress bar with time display
- 🎵 **Multiple Format Support**: Supports MP3, WAV, OGG, and M4A audio files
- 🎭 **Smart Lyrics Display**: Each lyric line appears once and hides after completion

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd carrot-oke
```

2. Install dependencies:
```bash
npm install
```

3. Add your audio files:
   - Place your karaoke audio files in `public/audio/`
   - Update the song list in `src/App.js`
   - Add corresponding lyrics data

4. Start the development server:
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) to view it in your browser

## 📁 Project Structure

```
carrot-oke/
├── public/
│   ├── audio/              # Audio files directory
│   └── ...
├── src/
│   ├── App.js             # Main application component
│   ├── App.css            # Main application styles
│   └── ...
├── components/
│   ├── MusicPlayer.js     # Main music player component
│   └── MusicPlayer.css    # Music player styles
└── README.md
```

## 🎵 Adding Songs

1. **Add Audio Files**: Place your audio files in the `public/audio/` directory

2. **Update Song List**: Modify the `sampleSongs` array in `src/App.js`:
```javascript
const sampleSongs = [
  {
    title: "Your Song Title",
    artist: "Artist Name",
    url: "/audio/your-song-file.mp3"
  },
  // Add more songs...
];
```

3. **Add Lyrics**: Create lyrics data with timing:
```javascript
const sampleLyrics = [
  { time: 0, text: "First line of lyrics" },
  { time: 5, text: "Second line of lyrics" },
  // Add more lyrics...
];
```

## 🎛️ Component Props

The `MusicPlayer` component accepts the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `songList` | Array | `[]` | Array of song objects with title, artist, and url |
| `currentSongIndex` | Number | `0` | Index of currently playing song |
| `onSongChange` | Function | - | Callback when song changes |
| `showLyrics` | Boolean | `true` | Whether to display lyrics |
| `lyrics` | Array | `[]` | Array of lyric objects with time and text |
| `onLyricsSync` | Function | - | Callback when lyrics sync |

## 🎨 Customization

### Styling
- Modify `components/MusicPlayer.css` for player styling
- Update `src/App.css` for overall app styling
- Colors, gradients, and animations can be easily customized

### Features
- Add scoring system for karaoke performance
- Implement recording functionality
- Add song search and filtering
- Create playlists and favorites

## 🏗️ Building for Production

```bash
npm run build
```

Builds the app for production to the `build` folder. The build is minified and optimized for best performance.

## 🧪 Testing

```bash
npm test
```

Launches the test runner in interactive watch mode.

## 📝 License Notes

- Ensure you have proper licensing for any audio content used
- Consider using royalty-free tracks for demo purposes
- For commercial use, obtain appropriate music licensing rights

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🎉 Features to Add

- [ ] Song search functionality
- [ ] Playlist management
- [ ] User profiles and scoring
- [ ] Voice recording and playback
- [ ] Song rating system
- [ ] Multiple theme options
- [ ] Social sharing features
- [ ] Offline mode support

## 🐛 Troubleshooting

**Audio not playing?**
- Check that your audio files are in the correct format
- Ensure file paths in the song list match actual file locations
- Verify browser audio permissions

**Lyrics not syncing?**
- Check that lyrics timing matches audio track
- Ensure lyrics array is properly formatted
- Verify audio file is loading correctly

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Made with ❤️ for karaoke lovers everywhere! 🎤✨

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## 🚀 Deployment

### Deploy to GitHub Pages

This project is set up for automatic deployment to GitHub Pages using GitHub Actions.

#### Automatic Deployment
1. Push your changes to the `main` branch
2. GitHub Actions will automatically build and deploy your site
3. Your site will be available at `https://yourusername.github.io/carrot-oke`

#### Manual Deployment
If you prefer to deploy manually:

```bash
# Build and deploy to GitHub Pages
npm run deploy
```

### Deploy to Other Platforms

#### Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect it's a React app and deploy it

#### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command to `npm run build`
3. Set publish directory to `build`
