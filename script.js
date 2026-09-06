document.addEventListener('DOMContentLoaded', () => {
  // 1. Modal Dialog Logic (About Creator)
  const mailBtn = document.getElementById('mail-btn');
  const aboutModal = document.getElementById('about-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalContentArea = document.getElementById('modal-content-area');

  let isContentLoaded = false;

  // Fetches about.html content for the creator card modal
  async function loadAboutContent() {
    if (isContentLoaded) return;

    try {
      const response = await fetch('about.html');
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const htmlText = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');
      const content = doc.querySelector('.creator-card-container');

      modalContentArea.innerHTML = content ? content.outerHTML : doc.body.innerHTML;
      isContentLoaded = true;
    } catch (error) {
      console.warn('Could not fetch about.html directly. Using iframe fallback.', error);
      modalContentArea.innerHTML = `<iframe src="about.html" class="modal-iframe" title="About the Creator"></iframe>`;
      isContentLoaded = true;
    }
  }

  function openModal() {
    if (!aboutModal) return;
    aboutModal.classList.add('active');
    aboutModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    loadAboutContent();
  }

  function closeModal() {
    if (!aboutModal) return;
    aboutModal.classList.remove('active');
    aboutModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (mailBtn) mailBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (aboutModal) {
    aboutModal.addEventListener('click', (e) => {
      if (e.target === aboutModal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && aboutModal && aboutModal.classList.contains('active')) {
      closeModal();
    }
  });

  // 2. Audio Engine & Track Management
  const playlist = [
    { title: "ISHQ WALA LOVE", artist: "NEETI MOHAN, SALIM MERCHANT, SHEKHAR RAVJIANI", album: "STUDENT OF THE YEAR", src: "audio/audio1.mp3" },
    { title: "TU HAI KI NAHI", artist: "ANKIT TIWARI", album: "ROY", src: "audio/audio2.mp3" },
    { title: "IS THIS LOVE", artist: "MOHIT CHAUHAN, SHREYA GHOSHAL", album: "KISMAT KONNECTION", src: "audio/audio3.mp3" },
    { title: "LAAPATA", artist: "KK, PALAK MUCHHAL", album: "EK THA TIGER", src: "audio/audio4.mp3" },
    { title: "TU JAANE NA (REPRISE)", artist: "SOHAM CHAKRABORTY", album: "AJAB PREM KI GHAZAB KAHANI", src: "audio/audio5.mp3" },
    { title: "KYA MUJHE PYAAR HAI", artist: "KK", album: "WOH LAMHE...", src: "audio/audio6.mp3" },
    { title: "BHEEGI SI BHAAGI SI", artist: "MOHIT CHAUHAN, ANTARA MITRA", album: "RAAJNEETI", src: "audio/audio7.mp3" },
    { title: "PAANI DA RANG", artist: "AYUSHMANN KHURRANA, SHREYA GHOSHAL", album: "VICKY DONOR", src: "audio/audio8.mp3" },
    { title: "SAADI GALLI AAJA", artist: "AYUSHMANN KHURRANA, NEETI MOHAN", album: "NAUTANKI SAALA!", src: "audio/audio9.mp3" },
    { title: "HANGOVER", artist: "MEET BROS, SALMAN KHAN, SHREYA GHOSHAL", album: "KICK", src: "audio/audio10.mp3" },
    { title: "KHUDA JAANE", artist: "SHREYA GHOSHAL, KK", album: "BACHNA AE HASEENO", src: "audio/audio11.mp3" },
    { title: "TUJHE BHULA DIYA", artist: "SHREYA GHOSHAL, KK", album: "BACHNA AE HASEENO", src: "audio/audio12.mp3" },
    { title: "MERA MANN KEHNE LAGA", artist: "FALAK SHABIR", album: "NAUTANKI SAALA!", src: "audio/audio13.mp3" }
  ];

  const savedTrackIndex = parseInt(localStorage.getItem("lastPlayedTrackIndex"), 10);
  let currentTrackIndex = (!isNaN(savedTrackIndex) && savedTrackIndex >= 0 && savedTrackIndex < playlist.length) 
    ? savedTrackIndex 
    : 0;
  let isPlaying = false;

  const audioPlayer = document.getElementById("audio-player");
  const playBtn = document.getElementById("play-btn");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  const iconPlay = playBtn ? playBtn.querySelector(".icon-play") : null;
  const iconPause = playBtn ? playBtn.querySelector(".icon-pause") : null;

  const trackTitle = document.getElementById("track-title");
  const trackArtist = document.getElementById("track-artist");
  const trackAlbum = document.getElementById("track-album");

  function updatePlayPauseIcons(playing) {
    if (!iconPlay || !iconPause) return;
    if (playing) {
      iconPlay.classList.add("hidden");
      iconPause.classList.remove("hidden");
    } else {
      iconPlay.classList.remove("hidden");
      iconPause.classList.add("hidden");
    }
  }

  function loadTrack(index) {
    const track = playlist[index];
    if (!track || !audioPlayer) return;

    audioPlayer.src = track.src;

    if (trackTitle) trackTitle.textContent = track.title;
    if (trackArtist) trackArtist.textContent = track.artist;
    if (trackAlbum) trackAlbum.textContent = track.album;

    // MediaSession metadata for OS control centers
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: track.title,
        artist: track.artist,
        album: track.album,
        artwork: [{ src: "assets/9xm_logo.svg", sizes: "512x512", type: "image/svg+xml" }]
      });
    }

    try {
      localStorage.setItem("lastPlayedTrackIndex", index);
    } catch (e) {
      console.warn("Could not save track index to localStorage:", e);
    }
  }

  function togglePlay() {
    if (!audioPlayer) return;

    if (isPlaying) {
      isPlaying = false;
      audioPlayer.pause();
      updatePlayPauseIcons(false);
      if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "paused";
    } else {
      audioPlayer.play()
        .then(() => {
          isPlaying = true;
          updatePlayPauseIcons(true);
          if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "playing";
        })
        .catch((err) => {
          console.error("Audio playback error:", err);
          isPlaying = false;
          updatePlayPauseIcons(false);
        });
    }
  }

  function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);

    if (isPlaying) {
      audioPlayer.play()
        .then(() => {
          updatePlayPauseIcons(true);
          if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "playing";
        })
        .catch((err) => console.error("Playback error on next track:", err));
    } else {
      updatePlayPauseIcons(false);
    }
  }

  function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);

    if (isPlaying) {
      audioPlayer.play()
        .then(() => {
          updatePlayPauseIcons(true);
          if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "playing";
        })
        .catch((err) => console.error("Playback error on previous track:", err));
    } else {
      updatePlayPauseIcons(false);
    }
  }

  if (playBtn) playBtn.addEventListener("click", togglePlay);
  if (nextBtn) nextBtn.addEventListener("click", nextTrack);
  if (prevBtn) prevBtn.addEventListener("click", prevTrack);

  if ("mediaSession" in navigator) {
    navigator.mediaSession.setActionHandler("play", () => { if (!isPlaying) togglePlay(); });
    navigator.mediaSession.setActionHandler("pause", () => { if (isPlaying) togglePlay(); });
    navigator.mediaSession.setActionHandler("previoustrack", prevTrack);
    navigator.mediaSession.setActionHandler("nexttrack", nextTrack);
  }

  if (audioPlayer) {
    audioPlayer.addEventListener("pause", () => {
      if (isPlaying) {
        setTimeout(() => {
          if (isPlaying && audioPlayer.paused) {
            audioPlayer.play().catch(() => {});
          }
        }, 300);
      }
    });

    audioPlayer.addEventListener("ended", nextTrack);
  }

  loadTrack(currentTrackIndex);
  updatePlayPauseIcons(false);

  // 3. Sunflower Mood Switcher & Background Hint
  const moodBtn = document.getElementById("mood-btn");
  const bgVideo = document.getElementById("bg-video");
  const sunflowerHint = document.getElementById("sunflower-hint");
  const closeHintBtn = document.getElementById("close-hint-btn");

  const backgroundList = [
    "assets/backgrounds/background1.mp4",
    "assets/backgrounds/background2.mp4",
    "assets/backgrounds/background3.mp4"
  ];

  const savedBgIndex = parseInt(localStorage.getItem("lastBackgroundIndex"), 10);
  let currentBgIndex = (!isNaN(savedBgIndex) && savedBgIndex >= 0 && savedBgIndex < backgroundList.length)
    ? savedBgIndex
    : 0;

  if (bgVideo && currentBgIndex !== 0) {
    bgVideo.src = backgroundList[currentBgIndex];
  }

  // Allow closing the background notification hint
  if (closeHintBtn && sunflowerHint) {
    closeHintBtn.addEventListener("click", () => {
      sunflowerHint.classList.add("hidden");
    });
  }

  if (moodBtn && bgVideo) {
    moodBtn.addEventListener("click", () => {
      // Hide hint when user touches/clicks the sunflower
      if (sunflowerHint) {
        sunflowerHint.classList.add("hidden");
      }

      currentBgIndex = (currentBgIndex + 1) % backgroundList.length;
      bgVideo.src = backgroundList[currentBgIndex];

      try {
        localStorage.setItem("lastBackgroundIndex", currentBgIndex);
      } catch (e) {
        console.warn("Could not save background index to localStorage:", e);
      }

      bgVideo.play().catch((err) => {
        console.warn("Background video play failed:", err);
      });
    });
  }

  // 4. Bade Chote Timed Animation Overlay (Chroma-Key Canvas)
  const badeChoteContainer = document.getElementById("bade-chote-container");
  const badeChoteVideo = document.getElementById("bade-chote-video");
  const badeChoteCanvas = document.getElementById("bade-chote-canvas");
  const ctx = badeChoteCanvas ? badeChoteCanvas.getContext("2d", { willReadFrequently: true }) : null;

  let animFrameId = null;
  let isAnimationActive = false;

  // Remove white background pixels in real-time on canvas
  function renderChromaFrame() {
    if (!isAnimationActive || !badeChoteVideo || !ctx || badeChoteVideo.paused || badeChoteVideo.ended) {
      return;
    }

    const width = badeChoteCanvas.width;
    const height = badeChoteCanvas.height;

    ctx.drawImage(badeChoteVideo, 0, 0, width, height);

    try {
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Soft feather white background
        if (r > 215 && g > 215 && b > 215) {
          if (r > 240 && g > 240 && b > 240) {
            data[i + 3] = 0;
          } else {
            const minVal = Math.min(r, g, b);
            data[i + 3] = Math.max(0, Math.floor((240 - minVal) * 10.2));
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
    } catch (e) {
      // Ignore canvas render errors
    }

    animFrameId = requestAnimationFrame(renderChromaFrame);
  }

  function triggerBadeChoteAnimation() {
    if (!badeChoteContainer || !badeChoteVideo || isAnimationActive) return;

    isAnimationActive = true;
    badeChoteContainer.classList.remove("bade-chote-hidden");
    badeChoteVideo.currentTime = 0;

    badeChoteVideo.play()
      .then(() => {
        if (animFrameId) cancelAnimationFrame(animFrameId);
        animFrameId = requestAnimationFrame(renderChromaFrame);
      })
      .catch((err) => {
        console.warn("Bade Chote animation playback prevented:", err);
        isAnimationActive = false;
        badeChoteContainer.classList.add("bade-chote-hidden");
      });
  }

  function stopBadeChoteAnimation() {
    isAnimationActive = false;
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
    if (badeChoteVideo) {
      badeChoteVideo.pause();
      badeChoteVideo.currentTime = 0;
    }
    if (ctx && badeChoteCanvas) {
      ctx.clearRect(0, 0, badeChoteCanvas.width, badeChoteCanvas.height);
    }
    if (badeChoteContainer) {
      badeChoteContainer.classList.add("bade-chote-hidden");
    }
  }

  if (badeChoteVideo && badeChoteContainer) {
    badeChoteVideo.addEventListener("ended", stopBadeChoteAnimation);
    setInterval(triggerBadeChoteAnimation, 35000);
    setTimeout(triggerBadeChoteAnimation, 12000);
  }
});
