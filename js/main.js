// Kiến thức & kỹ năng áp dụng: Hàm, biến, mảng, điều kiện if...else, vòng lặp for, sử dụng tag audio
const MUSIC_LIST = [
  {
      "img": "./images/Faded.jpeg",
      "name": "Faded",
      "artist": "Alan Walker",
      "music": "./music/fade.mp3"
  }
]

var nowPlaying = document.querySelector('.now-playing');
var trackArt = document.querySelector('.track-art');
var trackName = document.querySelector('.track-name');
var trackArtist = document.querySelector('.track-artist');

var playPauseTrack = document.querySelector('.playpause-track');
var nextTrack = document.querySelector('.next-track');
var prevTrack = document.querySelector('.prev-track');

var seekSlider = document.querySelector('.seek_slider');
var volumeSlider = document.querySelector('.volume_slider');
var currentTime = document.querySelector('.current-time');
var totalDuration = document.querySelector('.total-duration');
var wave = document.querySelector('.wave');
var randomIcon = document.querySelector('.fa-random');

var currentTrack = document.createElement('audio');

var trackIndex = 0;
var isPlaying = false;
var isRandom = false;
var updateTimer;

loadTrack(trackIndex);

function loadTrack(trackIndex) {
  clearInterval(updateTimer);
  reset();

  currentTrack.src = MUSIC_LIST[trackIndex].music;
  currentTrack.load();

  trackArt.style.backgroundImage = "url(" + MUSIC_LIST[trackIndex].img + ")";
  trackName.textContent = MUSIC_LIST[trackIndex].name;
  trackArtist.textContent = MUSIC_LIST[trackIndex].artist;
  nowPlaying.textContent = "Playing music " + (trackIndex + 1) + " of " + MUSIC_LIST.length;

  updateTimer = setInterval(setUpdate, 1000);

  currentTrack.addEventListener('ended', repeatTrack);
  randomBackgroundColor();
}

function reset() {
  currentTime.textContent = "00:00";
  totalDuration.textContent = "00:00";
  seekSlider.value = 0;
  volumeSlider.value = 10;
}

function setUpdate() {
  var seekPosition = 0;
  if (!isNaN(currentTrack.duration)) {
      seekPosition = currentTrack.currentTime * (100 / currentTrack.duration);
      seekSlider.value = seekPosition;

      var currentMinutes = Math.floor(currentTrack.currentTime / 60);
      var currentSeconds = Math.floor(currentTrack.currentTime - currentMinutes * 60);
      var durationMinutes = Math.floor(currentTrack.duration / 60);
      var durationSeconds = Math.floor(currentTrack.duration - durationMinutes * 60);

      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

      currentTime.textContent = currentMinutes + ":" + currentSeconds;
      totalDuration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

function getNextTrack() {
  if (trackIndex < MUSIC_LIST.length - 1 && isRandom === false) {
      trackIndex += 1;
  } else if (trackIndex < MUSIC_LIST.length - 1 && isRandom === true) {
      var randomIndex = Number.parseInt(Math.random() * MUSIC_LIST.length);
      trackIndex = randomIndex;
  } else {
      trackIndex = 0;
  }
  loadTrack(trackIndex);
  playTrack();
}

function getPrevTrack() {
  if (trackIndex > 0) {
      trackIndex -= 1;
  } else {
      trackIndex = MUSIC_LIST.length - 1;
  }
  loadTrack(trackIndex);
  playTrack();
}

function playOrPauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
  currentTrack.play();
  isPlaying = true;
  trackArt.classList.add('rotate');
  wave.classList.add('loader');
  playPauseTrack.innerHTML = '<i class="fa fa-pause-circle fa-3x"></i>';
  setVolume();
}

function pauseTrack() {
  currentTrack.pause();
  isPlaying = false;
  trackArt.classList.remove('rotate');
  wave.classList.remove('loader');
  playPauseTrack.innerHTML = '<i class="fa fa-play-circle fa-3x"></i>';
}

function randomBackgroundColor() {
  var colorOne = populate();
  var colorTwo = populate();
  document.body.style.background = 'linear-gradient(to right,' + colorOne + ',' + colorTwo + ")";
  document.querySelector(".seek_slider").style.background = 'linear-gradient(to right,' + colorOne + ',' + colorTwo + ")";
  document.querySelector(".volume_slider").style.background = 'linear-gradient(to right,' + colorOne + ',' + colorTwo + ")";
}



function populate() {
  var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
  var colorRandom = "#";
  for (var i = 0; i < 6; i++) {
      var x = Math.round(Math.random() * 14);
      var y = hex[x];
      colorRandom += y;
  }
  return colorRandom;
}

function getRandomTrack() {
  isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
  isRandom = true;
  randomIcon.classList.add('randomActive');
}

function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove('randomActive');
}

function repeatTrack() {
  loadTrack(trackIndex);
  playTrack();
}

function seekTo() {
  currentTrack.currentTime = currentTrack.duration * (seekSlider.value / 100);
}

function setVolume() {
  currentTrack.volume = volumeSlider.value / 100;
}

