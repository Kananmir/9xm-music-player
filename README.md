# 🎵 9XM Music Player

A nostalgic, retro 90s/2000s Bollywood music player web application inspired by the iconic **9XM** music television channel aesthetic. Features vibrant retro color stripes, animated TV scanlines, background video mood switcher, live ticker marquee, real-time chroma-key cartoon character overlays, and OS-level media integration.

---

## ✨ Features

- 📺 **Retro 9XM Aesthetic**: Authentic 90s/2000s TV channel vibe featuring vibrant yellow, cyan, and pink color stripes, CRT scanline overlay, and animated bottom marquee ticker with funny music quotes.
- 🌻 **Sunflower Mood Switcher**: Interactive sunflower icon that lets users toggle between dynamic retro background videos on the fly.
- 💡 **Interactive Guidance**: Built-in notification prompt guiding users on how to use the sunflower mood switcher, dismissible anytime.
- 🎶 **Curated Bollywood Playlist**: Pre-loaded with nostalgic 2000s/2010s Bollywood hits with synchronized play/pause, previous, and next track controls.
- 🕺 **Real-Time Chroma-Key Overlay**: Canvas-based real-time video processing engine that strips video backgrounds to render the iconic *Bade Chote* animated characters floating over the stage.
- 💾 **State Persistence**: Saves your last played track and selected background video in `localStorage` so playback resumes seamlessly on page refresh.
- 📻 **MediaSession API Integration**: Supports hardware media keys (Play, Pause, Next, Previous) and displays metadata/artwork on OS lock screens and control centers.
- 👤 **About the Creator Modal**: Custom pop-up dialog loaded dynamically with interactive social links.

---

## 📂 Project Structure

```
9xm_player/
├── index.html                   # Main HTML layout & stage frame
├── script.js                    # Audio engine, chroma-key canvas renderer & state logic
├── style.css                    # Retro 9XM styling, scanlines, stripes & animations
├── about.html                   # Creator modal content / standalone profile
├── README.md                    # Project documentation
├── audio_details.txt            # Track listing & artist metadata
├── audio/                       # Audio files (.mp3)
│   ├── audio1.mp3 ... audio13.mp3
└── assets/                      # SVGs, images & background videos
    ├── 9xm_logo.svg
    ├── about_the_creator.svg
    ├── sunflower_mood_switcher.png
    ├── chote_animation.mp4
    └── backgrounds/             # MP4 background loops
        ├── background1.mp4
        ├── background2.mp4
        └── background3.mp4
```

---

## 🚀 Getting Started

No build step or external package installation is required! The project runs entirely on vanilla HTML5, CSS3, and JavaScript.

### Local Development / Running
1. Clone or download the repository to your local machine.
2. Open `index.html` in any modern web browser (Google Chrome, Mozilla Firefox, Safari, Microsoft Edge).
3. Alternatively, serve using any local static HTTP server (e.g. VS Code Live Server).

---

## 🎵 Playlist Tracklist

1. **Ishq Wala Love** – Neeti Mohan, Salim Merchant, Shekhar Ravjiani (*Student of the Year*)
2. **Tu Hai Ki Nahi** – Ankit Tiwari (*Roy*)
3. **Is This Love** – Mohit Chauhan, Shreya Ghoshal (*Kismat Konnection*)
4. **Laapata** – KK, Palak Muchhal (*Ek Tha Tiger*)
5. **Tu Jaane Na (Reprise)** – Soham Chakraborty (*Ajab Prem Ki Ghazab Kahani*)
6. **Kya Mujhe Pyaar Hai** – KK (*Woh Lamhe...*)
7. **Bheegi Si Bhaagi Si** – Mohit Chauhan, Antara Mitra (*Raajneeti*)
8. **Paani Da Rang** – Ayushmann Khurrana, Shreya Ghoshal (*Vicky Donor*)
9. **Saadi Galli Aaja** – Ayushmann Khurrana, Neeti Mohan (*Nautanki Saala!*)
10. **Hangover** – Meet Bros, Salman Khan, Shreya Ghoshal (*Kick*)
11. **Khuda Jaane** – Shreya Ghoshal, KK (*Bachna Ae Haseeno*)
12. **Tujhe Bhula Diya** – Shreya Ghoshal, KK (*Bachna Ae Haseeno*)
13. **Mera Mann Kehne Laga** – Falak Shabir (*Nautanki Saala!*)

---

## 🛠️ Tech Stack

- **HTML5**: Semantic markup, video, canvas, audio elements, and MediaSession integration.
- **CSS3**: Custom properties (variables), Grid, Flexbox, Keyframe animations, backdrop blur, scanline overlays.
- **JavaScript (ES6+)**: DOM manipulation, Async/Await Fetch API, Canvas 2D Chroma-Keying (`getImageData` / `putImageData`), `localStorage` persistence.

---

## 📝 License

This project is created for personal and educational purposes. All audio tracks and original 9XM assets belong to their respective copyright holders.
