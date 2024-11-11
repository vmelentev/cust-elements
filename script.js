const img = document.getElementById("icon");
const volumeIcon = document.getElementById("volumeIcon");
var audio = document.getElementById("audio");
var playing = false;
var mute = false;

const progress = document.getElementById("progBar")
progress.max = audio.duration;

const volume = document.getElementById("volume");

volume.oninput = function() {
    audio.volume = volume.value / 100;
    updateSliderColor(volume);
    changeIcon();
}

function toggleMute(){
    if (mute === false) {
        mute = true;
        volumeIcon.src = "src/icons/mute.png";
        audio.volume = 0;
    }
    else {
        mute = false;
        audio.volume = volume.value / 100;
        changeIcon();
    }
}

function changeIcon() {
    if (audio.volume >= 0.65){
        volumeIcon.src = "src/icons/volume3.png";
    }
    else if (audio.volume >= 0.30 && audio.volume < 0.65) {
        volumeIcon.src = "src/icons/volume2.png";
    }
    else if (audio.volume > 0 && audio.volume < 0.30) {
        volumeIcon.src = "src/icons/volume1.png";
    }
    else{
        volumeIcon.src = "src/icons/mute.png";
    }
}

if(audio.play()){
    setInterval(()=>{
        progress.value = audio.currentTime;
        updateSliderColor(progress);
    }, 500);
}

progress.oninput = function() {
    audio.currentTime = progress.value;
    updateSliderColor(progress);
}

function updateSliderColor(slider){
    var point = (slider.value / slider.max) * 100;
    var color = 'linear-gradient(90deg, rgb(180, 180, 180) ' + point + '%, rgb(220,220,200) ' + point + '%)';
    slider.style.background = color;
}

function toggle(){
    if (playing === false) {
        img.src = "src/icons/pause.png";
        audio.play();
        playing = true;
    } 
    else {
        img.src = "src/icons/play.png";
        audio.pause();
        //audio.currentTime = 0;
        playing = false;
    }
}

