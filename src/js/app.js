document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const catalogGrid = document.getElementById('catalog-grid');
  const searchInput = document.getElementById('search-input');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const statsSongsCount = document.getElementById('stats-songs-count');
  
  // Modal Elements
  const historyModal = document.getElementById('history-modal');
  const modalClose = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalTranslation = document.getElementById('modal-translation');
  const modalFlag = document.getElementById('modal-flag');
  const modalBanner = document.getElementById('modal-banner');
  const modalMeta = document.getElementById('modal-meta');
  const modalDesc = document.getElementById('modal-desc');
  const modalLyricsOriginal = document.getElementById('modal-lyrics-original');
  const modalLyricsTranslation = document.getElementById('modal-lyrics-translation');
  const modalFactsList = document.getElementById('modal-facts-list');
  const modalPlayBtn = document.getElementById('modal-play-btn');
  
  // Player Elements
  const playerPlayBtn = document.getElementById('player-play');
  const playerPrevBtn = document.getElementById('player-prev');
  const playerNextBtn = document.getElementById('player-next');
  const playerProgress = document.getElementById('player-progress');
  const playerProgressContainer = document.getElementById('player-progress-container');
  const playerCurrentTime = document.getElementById('player-time-current');
  const playerDuration = document.getElementById('player-time-duration');
  const playerTitle = document.getElementById('player-title');
  const playerSubtitle = document.getElementById('player-subtitle');
  const playerFlag = document.getElementById('player-flag');
  const playerVolumeSlider = document.getElementById('player-volume');
  const playerMuteBtn = document.getElementById('player-mute');
  const playerNotice = document.getElementById('player-notice');
  const visualizerCanvas = document.getElementById('visualizer-canvas');
  
  // Global Audio & Player State
  let audio = new Audio();
  let currentSongIndex = 0;
  let isPlaying = false;
  let simulatedTimer = null;
  let simCurrentTime = 0;
  let simDuration = 120; // 2 minutes default for simulation
  let canvasContext = visualizerCanvas.getContext('2d');
  let animationFrameId = null;
  // Web Audio API analyser
  let audioContext = null;
  let analyser = null;
  let analyserDataArray = null;
  let sourceNode = null;
  let analyserEnabled = false;
  let analyserSilentFrames = 0;
  let analyserSilentWarned = false;
  
  // Active filter state
  let currentFilter = 'all';
  let searchQuery = '';
  
  function isFlagUrl(value) {
    return typeof value === 'string' && value.length > 0 && (
      value.startsWith('http://') ||
      value.startsWith('https://') ||
      value.startsWith('src/') ||
      value.startsWith('/') ||
      value.startsWith('data:')
    );
  }

  function getFlagImageHtml(song, classes = 'h-10 w-auto rounded-sm object-cover') {
    const source = song.flagUrl || song.flag || '';
    const altText = `Bendera ${song.country}`;

    if (isFlagUrl(source)) {
      return `<img src="${source}" alt="${altText}" class="${classes}" />`;
    }

    return `<span class="${classes}">${source || '🏳️'}</span>`;
  }

  function getFlagBackgroundHtml(song) {
    const source = song.flagUrl || song.flag || '';
    if (isFlagUrl(source)) {
      return `<img src="${source}" alt="" class="absolute inset-0 w-full h-full object-cover opacity-10 filter blur-sm" />`;
    }
    return `<div class="absolute opacity-10 text-9xl select-none filter blur-sm">${source || '🏳️'}</div>`;
  }

  function getImageThumbnailHtml(song) {
    const src = song.imageUrl || '';
    if (!src) return '';
    return `<div class="p-4"><img src="${src}" alt="Gambar ${song.title}" class="w-full h-36 object-cover rounded-lg shadow-md"></div>`;
  }

  function parseDuration(durationText) {
    const parts = durationText.split(':').map(part => parseInt(part, 10));
    if (parts.length === 2 && !Number.isNaN(parts[0]) && !Number.isNaN(parts[1])) {
      return (parts[0] * 60) + parts[1];
    }
    return 0;
  }

  function formatDuration(seconds) {
    if (!seconds || isNaN(seconds) || seconds <= 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // Init
  initApp();
  
  function initApp() {
    renderCatalog();
    setupPlayer(0, false); // Load first song without auto-play
    setupEventListeners();
    setupCanvas();
    animateVisualizer();
  }
  
  // --- RENDERING ---
  
  function renderCatalog() {
    catalogGrid.innerHTML = '';
    
    const filteredSongs = marchingSongs.filter(song => {
      const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            song.titleTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            song.composer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            song.country.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (currentFilter === 'all') return matchesSearch;
      return song.country.toLowerCase().includes(currentFilter.toLowerCase()) && matchesSearch;
    });
    
    statsSongsCount.textContent = `${filteredSongs.length} Songs Loaded`;
    
    if (filteredSongs.length === 0) {
      catalogGrid.innerHTML = `
        <div class="col-span-full text-center py-12 text-slate-400">
          <p class="text-lg">Tidak ada lagu marching yang cocok dengan pencarian Anda.</p>
          <button id="reset-filters-btn" class="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-brass-gold rounded-lg transition">Reset Pencarian</button>
        </div>
      `;
      document.getElementById('reset-filters-btn')?.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        filterButtons.forEach(b => {
          if (b.dataset.filter === 'all') b.classList.add('bg-brass-gold', 'text-brass-gold');
          else b.classList.remove('bg-brass-gold', 'text-brass-gold');
        });
        currentFilter = 'all';
        renderCatalog();
      });
      return;
    }
    
    filteredSongs.forEach((song) => {
      // Find index in global database
      const globalIndex = marchingSongs.findIndex(s => s.id === song.id);
      
      const card = document.createElement('div');
      card.className = 'glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col group';
      card.innerHTML = `
        <!-- Flag & Banner Area -->
        <div class="relative h-32 bg-slate-900 overflow-hidden flex items-center justify-center">
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent z-10"></div>
          
          <!-- Mock background flag watermark -->
          ${getFlagBackgroundHtml(song)}
          
          <!-- Country Badge & Year -->
          <div class="absolute top-4 left-4 z-20 flex items-center gap-2">
            <span class="inline-flex items-center justify-center h-8 w-10 bg-slate-950/80 px-1 py-0.5 rounded-md backdrop-blur-sm border border-white/10">
              ${getFlagImageHtml(song, 'h-6 w-auto rounded-sm object-cover')}
            </span>
            <span class="text-xs font-semibold bg-slate-950/80 text-brass-gold px-2.5 py-1 rounded-full backdrop-blur-sm border border-brass-gold/20 uppercase tracking-wider">${song.country}</span>
          </div>
          
          <div class="absolute bottom-3 right-4 z-20">
            <span class="text-xs text-slate-400 flex items-center gap-1 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-brass-gold" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
              </svg>
              ${song.year}
            </span>
          </div>
        </div>
        
        <!-- Content -->
        <div class="p-6 flex-grow flex flex-col justify-between">
          ${getImageThumbnailHtml(song)}
          <div>
            <span class="text-xs text-brass-gold/80 font-semibold tracking-widest uppercase mb-1 block">${song.category}</span>
            <h3 class="text-xl font-bold font-serif mb-1 group-hover:text-brass-gold transition duration-300">${song.title}</h3>
            <p class="text-sm text-slate-400 italic mb-3">"${song.titleTranslation}"</p>
            <p class="text-sm text-slate-300 line-clamp-3 mb-4">${song.shortDesc}</p>
          </div>
          
          <div class="pt-4 border-t border-white/5 flex items-center gap-3">
            <!-- Play/Pause Button on Card -->
            <button class="play-card-btn w-10 h-10 rounded-full bg-slate-800 hover:bg-brass-gold text-brass-gold hover:text-slate-950 flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer" data-index="${globalIndex}">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
              </svg>
            </button>
            
            <button class="view-history-btn px-4 py-2 text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 hover:border-white/20 rounded-lg flex-grow transition-all cursor-pointer" data-index="${globalIndex}">
              Lihat Sejarah
            </button>
          </div>
        </div>
      `;
      catalogGrid.appendChild(card);
    });
    
    // Attach listener for Card Play & History Buttons
    document.querySelectorAll('.play-card-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.dataset.index);
        playSong(index);
      });
    });
    
    document.querySelectorAll('.view-history-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.dataset.index);
        openModal(index);
      });
    });
  }
  
  // --- CUSTOM AUDIO PLAYER ---
  
  function setupPlayer(index, autoPlay = true) {
    currentSongIndex = index;
    const song = marchingSongs[currentSongIndex];
    console.debug('[player] setupPlayer index=', index, 'id=', song.id, 'audioUrl=', song.audioUrl);
    
    // Update player labels
    playerTitle.textContent = song.title;
    playerSubtitle.textContent = `${song.composer} (${song.country})`;
    playerFlag.innerHTML = getFlagImageHtml(song, 'h-10 w-auto rounded-sm object-cover');
    
    // Reset timings
    playerCurrentTime.textContent = "0:00";
    playerProgress.style.width = "0%";
    
    // Handle Audio URL Source
    if (audio) {
      audio.pause();
      audio.src = '';
    }
    
    if (simulatedTimer) {
      clearInterval(simulatedTimer);
      simulatedTimer = null;
    }
    
    if (song.audioUrl && song.audioUrl.trim() !== '') {
      // Direct Web Audio Playback
      audio.src = song.audioUrl;
      console.debug('[player] set audio.src ->', audio.src);
      audio.load();
      // Prefer duration declared in data.js; otherwise show placeholder until metadata loads
      const expectedSeconds = parseDuration(song.duration);
      if (expectedSeconds > 0) {
        playerDuration.textContent = song.duration;
      } else {
        playerDuration.textContent = '0:00';
      }
      playerNotice.classList.add('hidden');
      
      // Update Volume
      audio.volume = playerVolumeSlider.value / 100;
      
      // Prepare analyser for real audio
      setupAnalyser();
      audio.addEventListener('error', (ev) => {
        console.error('[player] audio element error', ev, 'src=', audio.src);
      });
      if (autoPlay) {
        // Resume audio context on user gesture if needed
        if (audioContext && audioContext.state === 'suspended') {
          audioContext.resume().catch(() => {});
        }
        audio.play().then(() => {
          isPlaying = true;
          updatePlayerUIState();
        }).catch(err => {
          console.error("Audio playback error: ", err, 'audio.src=', audio.src, 'audioContext=', audioContext && audioContext.state);
          fallbackToSimulation(song, autoPlay);
        });
      } else {
        isPlaying = false;
        updatePlayerUIState();
      }
    } else {
      // If user hasn't set audio url, fallback to simulated playback
      teardownAnalyser();
      fallbackToSimulation(song, autoPlay);
    }
  }
  
  function fallbackToSimulation(song, autoPlay) {
    playerNotice.innerHTML = `
      <div class="flex items-center gap-2 text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1.5 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>Audio file path kosong. Memutar simulasi fiksi.</span>
      </div>
    `;
    playerNotice.classList.remove('hidden');
    
    // Set duration based on static duration
    playerDuration.textContent = song.duration;
    simDuration = parseDuration(song.duration);
    simCurrentTime = 0;
    
    if (autoPlay) {
      startSimulation();
    } else {
      isPlaying = false;
      updatePlayerUIState();
    }
  }
  
  function startSimulation() {
    isPlaying = true;
    updatePlayerUIState();
    
    if (simulatedTimer) clearInterval(simulatedTimer);
    
    simulatedTimer = setInterval(() => {
      if (simCurrentTime >= simDuration) {
        clearInterval(simulatedTimer);
        simulatedTimer = null;
        playNextSong();
        return;
      }
      simCurrentTime++;
      updateSimulationUI();
    }, 1000);
  }

  function setupAnalyser() {
    try {
      if (!window.AudioContext && !window.webkitAudioContext) {
        analyserEnabled = false;
        return;
      }
      if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();

      // Only create a MediaElementSource once per audio element. Reuse if already created.
      if (!sourceNode) {
        try {
          sourceNode = audioContext.createMediaElementSource(audio);
        } catch (createErr) {
          console.warn('createMediaElementSource failed — source may already exist elsewhere', createErr);
          analyserEnabled = false;
          return;
        }
      }

      // Create analyser if not present and connect
      if (!analyser) {
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        analyserDataArray = new Uint8Array(analyser.frequencyBinCount);
        try {
          sourceNode.connect(analyser);
          analyser.connect(audioContext.destination);
        } catch (connErr) {
          console.warn('Analyser connect failed, falling back to direct connect', connErr);
          try {
            // Ensure audio still reaches output by connecting source directly
            sourceNode.connect(audioContext.destination);
          } catch (directErr) {
            console.warn('Direct connect also failed', directErr);
            analyserEnabled = false;
            return;
          }
        }
      }

      analyserEnabled = true;
    } catch (err) {
      console.warn('Analyser setup failed', err);
      analyserEnabled = false;
    }
  }

  function teardownAnalyser() {
    try {
      // Do not destroy sourceNode (createMediaElementSource can only be called once per element).
      if (analyser) {
        try { analyser.disconnect(); } catch (e) {}
        analyser = null;
      }
    } catch (e) {}
    analyserDataArray = null;
    analyserEnabled = false;
  }
  
  function updateSimulationUI() {
    // Current Time Formatter
    const minutes = Math.floor(simCurrentTime / 60);
    const seconds = Math.floor(simCurrentTime % 60);
    playerCurrentTime.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
    // Progress Bar
    const progressPercent = (simCurrentTime / simDuration) * 100;
    playerProgress.style.width = `${progressPercent}%`;
  }
  
  function playSong(index) {
    console.debug('[player] playSong index=', index);
    setupPlayer(index, true);
    // Smooth scroll to player if visible/needed
    const playerSection = document.getElementById('global-music-player');
    playerSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  
  function playNextSong() {
    let nextIndex = currentSongIndex + 1;
    if (nextIndex >= marchingSongs.length) {
      nextIndex = 0;
    }
    playSong(nextIndex);
  }
  
  function playPrevSong() {
    let prevIndex = currentSongIndex - 1;
    if (prevIndex < 0) {
      prevIndex = marchingSongs.length - 1;
    }
    playSong(prevIndex);
  }
  
  function togglePlay() {
    const currentSong = marchingSongs[currentSongIndex];
    const hasRealAudio = currentSong.audioUrl && currentSong.audioUrl.trim() !== '';
    
    if (isPlaying) {
      // Pause
      isPlaying = false;
      if (hasRealAudio) {
        audio.pause();
      } else {
        if (simulatedTimer) {
          clearInterval(simulatedTimer);
          simulatedTimer = null;
        }
      }
    } else {
      // Play
      isPlaying = true;
      if (hasRealAudio) {
        if (audioContext && audioContext.state === 'suspended') {
          audioContext.resume().catch(() => {});
        }
        audio.play().then(() => {
          updatePlayerUIState();
        }).catch(err => {
          console.error("Playback error: ", err);
          startSimulation();
        });
      } else {
        startSimulation();
      }
    }
    updatePlayerUIState();
  }
  
  function updatePlayerUIState() {
    if (isPlaying) {
      // Update toggle play icon to pause icon
      playerPlayBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      `;
    } else {
      // Update to play icon
      playerPlayBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
        </svg>
      `;
    }
  }
  
  // Progress Bar click to scrub
  function handleScrub(e) {
    const rect = playerProgressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickPercentage = clickX / width;
    
    const currentSong = marchingSongs[currentSongIndex];
    const expectedDuration = parseDuration(currentSong.duration);
    const hasRealAudio = currentSong.audioUrl && currentSong.audioUrl.trim() !== '';
    
    if (hasRealAudio && expectedDuration > 0) {
      const targetTime = clickPercentage * expectedDuration;
      audio.currentTime = targetTime;
      playerCurrentTime.textContent = `${Math.floor(targetTime / 60)}:${(Math.floor(targetTime % 60) < 10 ? '0' : '')}${Math.floor(targetTime % 60)}`;
      playerProgress.style.width = `${Math.min(clickPercentage * 100, 100)}%`;
    } else if (hasRealAudio && audio.duration) {
      audio.currentTime = clickPercentage * audio.duration;
    } else {
      // Mock simulation jump
      simCurrentTime = Math.floor(clickPercentage * simDuration);
      updateSimulationUI();
      if (!isPlaying) {
        // Toggle play if it was paused to start simulation
        startSimulation();
      }
    }
  }
  
  // Real HTML5 Audio listeners
  audio.addEventListener('loadedmetadata', () => {
    const currentSong = marchingSongs[currentSongIndex];
    const expected = parseDuration(currentSong.duration);
    if (expected && expected > 0) {
      // Keep the declared duration from data.js
      playerDuration.textContent = currentSong.duration;
    } else if (audio.duration) {
      // Fallback to actual audio file duration
      playerDuration.textContent = formatDuration(Math.floor(audio.duration));
    }
  });
  audio.addEventListener('timeupdate', () => {
    const currentSong = marchingSongs[currentSongIndex];
    const durationSeconds = parseDuration(currentSong.duration) || audio.duration;
    if (durationSeconds && audio.duration) {
      const progressPercent = (audio.currentTime / durationSeconds) * 100;
      playerProgress.style.width = `${Math.min(progressPercent, 100)}%`;
      
      const currentMin = Math.floor(audio.currentTime / 60);
      const currentSec = Math.floor(audio.currentTime % 60);
      playerCurrentTime.textContent = `${currentMin}:${currentSec < 10 ? '0' : ''}${currentSec}`;
    }
  });
  
  audio.addEventListener('ended', () => {
    playNextSong();
  });
  
  // Volume controller
  playerVolumeSlider.addEventListener('input', (e) => {
    const val = e.target.value;
    audio.volume = val / 100;
    if (val == 0) {
      playerMuteBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      `;
    } else {
      playerMuteBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-brass-gold" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM16 10a6 6 0 01-6 6v-1.2A4.8 4.8 0 0014.8 10 4.8 4.8 0 0010 5.2V4a6 6 0 016 6z" clip-rule="evenodd" />
        </svg>
      `;
    }
  });
  
  playerMuteBtn.addEventListener('click', () => {
    if (audio.muted || playerVolumeSlider.value == 0) {
      audio.muted = false;
      playerVolumeSlider.value = 50;
      audio.volume = 0.5;
      playerMuteBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-brass-gold" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM16 10a6 6 0 01-6 6v-1.2A4.8 4.8 0 0014.8 10 4.8 4.8 0 0010 5.2V4a6 6 0 016 6z" clip-rule="evenodd" />
        </svg>
      `;
    } else {
      audio.muted = true;
      playerVolumeSlider.value = 0;
      playerMuteBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      `;
    }
  });
  
  // --- SEJARAH MODAL VIEW ---
  
  function openModal(index) {
    const song = marchingSongs[index];
    
    modalTitle.textContent = song.title;
    modalTranslation.textContent = `"${song.titleTranslation}"`;
    modalFlag.innerHTML = getFlagImageHtml(song, 'h-16 w-auto rounded-sm object-cover');
    modalMeta.textContent = `${song.composer} | ${song.year} | ${song.era}`;
    modalDesc.innerHTML = song.fullHistory.replace(/\n/g, '<br>');
    
    // Lyrics original & translation
    modalLyricsOriginal.innerHTML = song.lyrics.original.replace(/\n/g, '<br>');
    modalLyricsTranslation.innerHTML = song.lyrics.translation.replace(/\n/g, '<br>');
    
    // Fun facts rendering
    modalFactsList.innerHTML = '';
    song.facts.forEach(fact => {
      const li = document.createElement('li');
      li.className = 'flex items-start gap-2.5';
      li.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-brass-gold shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <span class="text-slate-300 text-sm">${fact}</span>
      `;
      modalFactsList.appendChild(li);
    });
    
    // Modal play button integration
    modalPlayBtn.dataset.index = index;
    // Banner image for modal (if available)
    if (modalBanner) {
      if (song.bannerUrl && song.bannerUrl.trim() !== '') {
        modalBanner.innerHTML = `<img src="${song.bannerUrl}" alt="Banner ${song.title}" class="w-full h-full object-cover" />`;
      } else {
        modalBanner.innerHTML = '';
      }
    }
    
    // Show Modal
    historyModal.classList.remove('hidden');
    historyModal.classList.add('flex');
    document.body.classList.add('overflow-hidden');
  }
  
  function closeModal() {
    historyModal.classList.add('hidden');
    historyModal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
  }
  
  // --- VISUALIZER DRAW ---
  
  function setupCanvas() {
    // Sync canvas resolution with display width
    visualizerCanvas.width = visualizerCanvas.parentElement.clientWidth;
    visualizerCanvas.height = 80;
    
    window.addEventListener('resize', () => {
      if (visualizerCanvas) {
        visualizerCanvas.width = visualizerCanvas.parentElement.clientWidth;
      }
    });
  }
  
  function animateVisualizer() {
    // Continuous loop
    animationFrameId = requestAnimationFrame(animateVisualizer);
    
    const width = visualizerCanvas.width;
    const height = visualizerCanvas.height;
    
    canvasContext.clearRect(0, 0, width, height);
    
    const barWidth = 4;
    const barGap = 3;
    const numBars = Math.floor(width / (barWidth + barGap));
    const time = Date.now() * 0.003;
    if (analyserEnabled && analyser && analyserDataArray) {
      // Use frequency data from the analyser
      analyser.getByteFrequencyData(analyserDataArray);
      // Detect CORS / file:// zeroed output: if analyser returns near-zero repeatedly, fallback to simulated wave
      let total = 0;
      for (let k = 0; k < analyserDataArray.length; k++) total += analyserDataArray[k];
      const avgTotal = total / analyserDataArray.length;
      if (avgTotal < 1) {
        analyserSilentFrames++;
      } else {
        analyserSilentFrames = 0;
        analyserSilentWarned = false;
      }
      if (analyserSilentFrames > 6) {
        if (!analyserSilentWarned) {
          console.warn('[analyser] Detected near-zero frequency data; likely CORS/file:// restrictions. Falling back to simulated visualizer.');
          analyserSilentWarned = true;
        }
        // fall through to simulated rendering below
      } else {
        const binSize = Math.max(1, Math.floor(analyserDataArray.length / numBars));
        for (let i = 0; i < numBars; i++) {
          const start = i * binSize;
          let sum = 0;
          for (let j = 0; j < binSize; j++) {
            sum += analyserDataArray[start + j] || 0;
          }
          const avg = sum / binSize; // 0-255
          // Scale to canvas height with a small base
          const barHeight = 4 + (avg / 255) * (height - 10);
          const x = i * (barWidth + barGap);
          const y = (height - barHeight) / 2;

          const grad = canvasContext.createLinearGradient(x, y, x, y + barHeight);
          grad.addColorStop(0, '#f6e095');
          grad.addColorStop(0.5, '#c59b27');
          grad.addColorStop(1, '#5c0620');

          canvasContext.fillStyle = grad;
          canvasContext.beginPath();
          canvasContext.roundRect(x, y, barWidth, barHeight, 2);
          canvasContext.fill();
        }
        // rendered analyser frame; skip simulated fallback
        return;
      }
    }
    // Fallback visual (simulated wave)
    for (let i = 0; i < numBars; i++) {
      let barHeight = 4; // Flat base when not playing

      if (isPlaying) {
        // Multi-frequency wave calculation (combination of sine waves + noise)
        const factor1 = Math.sin(i * 0.15 + time * 1.5);
        const factor2 = Math.cos(i * 0.05 - time * 2.2);
        const factor3 = Math.sin(i * 0.3 + time * 4.0);

        let amplitude = (factor1 * 0.4 + factor2 * 0.4 + factor3 * 0.2);
        amplitude = Math.abs(amplitude);

        // Boost center bars slightly for visual aesthetic
        const centerOffset = Math.abs(i - (numBars / 2)) / (numBars / 2);
        const centerBoost = 1 - centerOffset;

        barHeight = 5 + (amplitude * (height - 15) * (0.4 + centerBoost * 0.6));
      }

      const x = i * (barWidth + barGap);
      const y = (height - barHeight) / 2;

      // Brass golden gradient
      const grad = canvasContext.createLinearGradient(x, y, x, y + barHeight);
      grad.addColorStop(0, '#f6e095'); // light gold
      grad.addColorStop(0.5, '#c59b27'); // core gold
      grad.addColorStop(1, '#5c0620'); // deep crimson at bottom

      canvasContext.fillStyle = grad;
      canvasContext.beginPath();
      // Draw rounded pill bars
      canvasContext.roundRect(x, y, barWidth, barHeight, 2);
      canvasContext.fill();
    }
  }
  
  // --- EVENT LISTENERS ---
  
  function setupEventListeners() {
    // Search
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderCatalog();
    });
    
    // Category Tabs Filtering
    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        filterButtons.forEach(b => {
          b.classList.remove('bg-brass-gold', 'text-brass-gold', 'text-slate-950', 'border-brass-gold/20');
          b.classList.add('bg-slate-900', 'border-white/5', 'text-slate-300');
        });

        e.currentTarget.classList.add('bg-brass-gold', 'text-slate-950');
        e.currentTarget.classList.remove('bg-slate-900', 'border-white/5', 'text-slate-300', 'text-brass-gold');
        
        currentFilter = e.currentTarget.dataset.filter;
        renderCatalog();
      });
    });
    
    // Global player triggers
    playerPlayBtn.addEventListener('click', togglePlay);
    playerNextBtn.addEventListener('click', playNextSong);
    playerPrevBtn.addEventListener('click', playPrevSong);
    playerProgressContainer.addEventListener('click', handleScrub);
    
    // Modal controls
    modalClose.addEventListener('click', closeModal);
    historyModal.addEventListener('click', (e) => {
      if (e.target === historyModal) closeModal();
    });
    
    modalPlayBtn.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.dataset.index);
      playSong(idx);
      closeModal();
    });
  }
});
