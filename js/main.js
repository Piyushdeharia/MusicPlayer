//deifining variables

let audio, playbtn, title, poster, artists, mutebtn, seekslider, volumeslider, seeking=false,
    seekto, curtimetext, durtimetext, playlist_status, dir, playlist, ext, agent, playlist_artist,
    repeat, random;
    document.body.style.backgroundImage = "url('./images/background.jpg')";
//Initialization of Array of Music, title, poster, image, artists

dir="/Music/";
playlist=[ "Cartoon-On-_-On","Elektronomia","Johnning","Popsicle", "Fearless"];
title=["Cartoon - On & On feat. Daniel Levi","Sky High","Heroes Tonight (feat. Johnning","Popsicle","Fearless"];
artists=["a","b","c","d"];
poster=["images/ncs1.jpeg","images/ncs2.jpg","images/ncs3.jpg","images/ncs4.jpg","images/ncs5.jpg"];

//used to run on every browser
ext=".mp3";
agent=navigator.userAgent.toLocaleLowerCase();
if(agent.indexOf('firefox')!= -1 || agent.indexOf('opera') != -1){
    ext=".ogg";
}

//set object reference
playbtn=document.getElementById("playpausebtn");
nextbtn=document.getElementById("nextbtn");
prevbtn=document.getElementById("prevbtn");
mutebtn=document.getElementById("mutebtn");
seekslider=document.getElementById("seekslider");
volumeslider=document.getElementById("volumeslider");
curtimetext=document.getElementById("curtimetext");
durtimetext=document.getElementById("durtimeText");
playlist_status=document.getElementById("playlist_status");
playlist_artist=document.getElementById("playlist_artist");
repeat=document.getElementById("repeat");
randomSong=document.getElementById("random");

playlist_index= 0;
//Audio Object
audio= new Audio();
audio.src= dir + playlist[0] + ext;
audio.loop=false;

//First Song title and artist
playlist_status.innerHTML = title[playlist_index];
playlist_artist.innerHTML= artists[playlist_index];

//Add Event listenrer
playbtn.addEventListener("click",playPause);
nextbtn.addEventListener("click",nextSong);
prevbtn.addEventListener("click",prevSong);
mutebtn.addEventListener("click",mute);
seekslider.addEventListener("mousedown", function(event){seeking=true;seek(event);});
seekslider.addEventListener("mousemove",function(event){seek(event);});
seekslider.addEventListener("mouseup",function(event){seeking=false;seek(event);});
volumeslider.addEventListener("mousemove",setVolume);
audio.addEventListener("timeupdate",function(){seektimeupdate();});
audio.addEventListener("ended",function(){switchTrack();});
repeat.addEventListener("click",loop);
randomSong.addEventListener("click",Random);

//functions
function fetchMusicDetails(){
    //posterImage, pause/play image
    $("#playpausebtn img").attr("src","images/pause-red.png");
    $("#bgImage").attr("src",poster[playlist_index]);
    $("#image").attr("src",poster[playlist_index]);

    //title and artists
    playlist_status.innerHTML=title[playlist_index];
    playlist_artist.innerHTML=artists[playlist_index];


    audio.src=dir+playlist[playlist_index]+ext;
    audio.play();
}

function playPause(){
    if(audio.paused){
        audio.play();
        $("#playpausebtn img").attr("src","images/pause-red.png");
    }else{
        audio.pause();
        $("#playpausebtn img").attr("src","images/play-red.png");
    }
}
function nextSong(){
    playlist_index++;
    if(playlist_index>playlist.length-1){
        playlist_index=0;
    }
    fetchMusicDetails();
}
function prevSong(){
    playlist_index--;
    if(playlist_index<0){
        playlist_index=playlist.length-1;
    }
    fetchMusicDetails();
}
function mute(){
    if(audio.muted){
        audio.muted=false;
        $("#mutebtn img").attr("src", "images/speaker.png");
    }else{
        audio.muted=true;
        $("#mutebtn img").attr("src", "images/mute.png");
    }
}
function seek(event){
    if(audio.duration==0){
        null
    }else{
        if(seeking){
            //seekslider.value=event.clientX- seekslider.offsetLeft;
            seekto=audio.duration * (seekslider.value/100);
            audio.currentTime=seekto;
        }
    }
}

function setVolume(){
    audio.volume=volumeslider.value / 100;
}

function seektimeupdate(){
    if(audio.duration){
        let nt=audio.currentTime*(100/audio.duration);
        seekslider.value=nt;
        var curmins=Math.floor(audio.currentTime/60);
        var cursecs=Math.floor(audio.currentTime - curmins*60);
        var durmins= Math.floor(audio.duration/60);
        var dursecs=Math.floor(audio.duration-durmins*60);
        if(cursecs<10){cursecs="0"+cursec}
        if(dursecs<10){dursecs="0"+dursecs}
        if(curmins<10){curmins="0"+curmins}
        if(dursecs<10){dursec="0"+dursecs}
        curtimetext.innerHTML=curmins+":"+cursecs;
        durtimetext.innerHTML=durmins+":"+dursecs;
    }else{
        curtimetext.innerHTML="00"+":"+"00";
        durtimetext.innerHTML="00"+":"+"00";
    }
}

function switchTrack() {
    if(playlist_index==(playlist.length-1)){
        playlist_index=0;
    }else{
        playlist_index++;
    }
    fetchMusicDetails();
}
function loop() {
    if(audio.loop){
        audio.loop=false;
        $("#repeat img").attr("src","images/rep.png");
    }else{
        audio.loop=true;
        $("#repeat img").attr("src","images/rep1.png");
    }
}

function Random() {
    let randomIndex=Math.floor(Math.random() * playlist.length);
    playlist_index=randomIndex;
    fetchMusicDetails();
}