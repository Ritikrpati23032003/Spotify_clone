// alert('Welcome to Spotify');


//Initialize the variables
let index=0;
let audioElement=new Audio('Music/1.mp3');
let masterplay=document.getElementById("masterplay");
let myProgressBar=document.getElementById("myProgressBar");
let songitems=Array.from(document.getElementsByClassName('songitem'));
let songs = [
    { songname: "Khamosiyan", filePath: "Music/1.mp3", coverPath: "coverpage/khamosiyan.jpeg" },
    { songname: "Tum hi ho", filePath: "Music/2.mp3", coverPath: "coverpage/tum hi ho.jpg" },
    { songname: "Aa re pritam pyare", filePath: "Music/3.mp3", coverPath: "coverpage/Aa re pritam pyare.jpg" },
    { songname: "Aila re aila", filePath: "Music/4.mp3", coverPath: "coverpage/Aila re aila.jpg" },
    { songname: "Asihq banaya apne", filePath: "Music/5.mp3", coverPath: "coverpage/asiqbanaya.jpg" },
    { songname: "ishq main", filePath: "Music/6.mp3", coverPath: "coverpage/ishq Mein.jpg" },
    { songname: "Mere Mehboob", filePath: "Music/7.mp3", coverPath: "coverpage/Mere Mehboob.jpg" },
    { songname: "Kisik", filePath: "Music/8.mp3", coverPath: "coverpage/kisik.jpg" },
];


// update covers logic...
songitems.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;  // Fixed typo
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname;  // Fixed object name
});


//Handle play/pause click
masterplay.addEventListener('click',()=>{
    // for audio play logic
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterplay.classList.remove('fa-circle-play'); // remove play buuton
        masterplay.classList.add('fa-circle-pause');   // add pause button
    }
    // for audio pause logic
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-circle-pause'); // remove pause button
        masterplay.classList.add('fa-circle-play'); // add play buuton
    }
})


//Listen to events
audioElement.addEventListener('timeupdate',()=>{
    // console.log("timeupdate");
    //Update seek bar/progrssbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    // console.log(progress);
    myProgressBar.value=progress;
})
//change seek bar logic
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
})
// // or
// myProgressBar.addEventListener('change', () => {
//     audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
// });



const makeAllplays = () => {
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};


Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllplays(); // Reset all play buttons
        
        let index = parseInt(e.target.id); // Get index from the clicked button
        if (isNaN(index)) return; // Prevent errors if ID is not a number

        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');

        audioElement.src = `music/${index}.mp3`; // Corrected template literal
        audioElement.currentTime = 0;
        audioElement.play();

        masterplay.classList.remove('fa-circle-play'); // Update masterplay button
        masterplay.classList.add('fa-circle-pause');
    });
});


document.getElementById('next').addEventListener('click', () => {
    if (index >= 5) {
        index = 0;
    } else {
        index += 1;
    }
    audioElement.src = `music/${index + 1}.mp3`; // Corrected template literal
    audioElement.currentTime = 0;
    audioElement.play();
    
    masterplay.classList.remove('fa-circle-play'); // Update masterplay button
    masterplay.classList.add('fa-circle-pause');
});

document.getElementById('previous').addEventListener('click', () => {
    if (index <= 0) {
        index = 0;
    } else {
        index -= 1;
    }
    audioElement.src = `music/${index + 1}.mp3`; // Corrected template literal
    audioElement.currentTime = 0;
    audioElement.play();
    
    masterplay.classList.remove('fa-circle-play'); // Update masterplay button
    masterplay.classList.add('fa-circle-pause');
});