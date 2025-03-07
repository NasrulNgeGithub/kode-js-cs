    const audio = document.getElementById('audio');
    const playBtn = document.getElementById('play');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const progress = document.querySelector('.progress');
    const progressContainer = document.querySelector('.progress-container');
    const albumCover = document.getElementById('albumCover');
    const trackTitle = document.getElementById('trackTitle');
    const playlistToggle = document.getElementById('playlistToggle');
    const playlistContainer = document.getElementById('playlistContainer');
    const currentTimeDisplay = document.getElementById('currentTime');
    const durationDisplay = document.getElementById('duration');

    let currentTrack = 0;

    function getTrackDuration(track, callback) {
        const tempAudio = new Audio();
        tempAudio.src = track.src;
        tempAudio.addEventListener('loadedmetadata', () => {
            track.duration = tempAudio.duration;
            callback();
        });
    }

    function loadTrack(trackIndex) {
        audio.pause();
        getTrackDuration(playlist[trackIndex], () => {
            audio.src = playlist[trackIndex].src;
            albumCover.src = playlist[trackIndex].cover;
            trackTitle.textContent = playlist[trackIndex].title;
            audio.load();
            audio.addEventListener('loadedmetadata', () => {
                playlist[trackIndex].duration = audio.duration;
                updatePlaylist();
                if (audio.paused) {
                    playBtn.innerHTML = '<i class="fa fa-play"></i>';
                } else {
                    playBtn.innerHTML = '<i class="fa fa-pause"></i>';
                }
            });
            if (audio.paused) {
                playBtn.innerHTML = '<i class="fa fa-play"></i>';
            } else {
                playBtn.innerHTML = '<i class="fa fa-pause"></i>';
            }
        });
    }

    function playPause() {
        if (audio.paused) {
            audio.play();
            playBtn.innerHTML = '<i class="fa fa-pause"></i>';
        } else {
            audio.pause();
            playBtn.innerHTML = '<i class="fa fa-play"></i>';
        }
    }

    function nextTrack() {
        currentTrack = (currentTrack + 1) % playlist.length;
        loadTrack(currentTrack);
    }

    function prevTrack() {
        currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
        loadTrack(currentTrack);
    }

    playBtn.addEventListener('click', playPause);
    nextBtn.addEventListener('click', nextTrack);
    prevBtn.addEventListener('click', prevTrack);

    audio.addEventListener('timeupdate', () => {
        const { duration, currentTime } = audio;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        currentTimeDisplay.textContent = formatTime(currentTime);
        durationDisplay.textContent = formatTime(duration);
    });

    progressContainer.addEventListener('click', (e) => {
        const width = progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    });

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    audio.addEventListener('loadedmetadata', function () {
        durationDisplay.textContent = formatTime(audio.duration);
    });

    function updatePlaylist() {
        playlistContainer.innerHTML = '';
        playlist.forEach((track, index) => {
            const item = document.createElement('div');
            item.classList.add('playlist-item');
            if (index === currentTrack) {
                item.classList.add('active');
                item.innerHTML = `<span class="title">${track.title}</span><span class="duration">${formatTime(track.duration)}</span>`;
            } else {
                item.innerHTML = `<span class="title">${track.title}</span><span class="duration" style="display: none;">${formatTime(track.duration)}</span>`;
            }
            item.addEventListener('click', () => {
                currentTrack = index;
                loadTrack(currentTrack);
                updatePlaylist();
                playPause();
            });
            playlistContainer.appendChild(item);
        });
    }

    audio.addEventListener('ended', () => {
        nextTrack();
    });

    loadTrack(currentTrack);
    updatePlaylist();

    if (audio.paused) {
        playBtn.innerHTML = '<i class="fa fa-play"></i>';
    } else {
        playBtn.innerHTML = '<i class="fa fa-pause"></i>';
    }

    playlistToggle.addEventListener('click', () => {
        playlistContainer.classList.toggle('open');
        if (playlistContainer.classList.contains('open')) {
            playlistToggle.textContent = 'Tutup Playlist';
        } else {
            playlistToggle.textContent = 'Buka Playlist';
        }
    });