
let stop_word = ["mightn't", 're', 'wasn', 'wouldn', 'be', 'has', 'that', 'does', 'shouldn', 'do', "you've", 'off', 'for', "didn't", 'm', 'ain', 'haven', "weren't", 'are', "she's", "wasn't", 'its', "haven't", "wouldn't", 'don', 'weren', 's', "you'd", "don't", 'doesn', "hadn't", 'is', 'was', "that'll", "should've", 'a', 'then', 'the', 'mustn', 'i', 'nor', 'as', "it's", "needn't", 'd', 'am', 'have', 'hasn', 'o', "aren't", "you'll", "couldn't", "you're", "mustn't", 'didn', "doesn't", 'll', 'an', 'hadn', 'whom', 'y', "hasn't", 'itself', 'couldn', 'needn', "shan't", 'isn', 'been', 'such', 'shan', "shouldn't", 'aren', 'being', 'were', 'did', 'ma', 't', 'having', 'mightn', 've', "isn't", "won't"]

let isl_gif = [
    'a','address','ahemdabad','all','any questions','are you angry','are you busy','are you hungry','assam',
    'august','b','banana','banaras','banglore','be careful','bridge','c','cat', 'christmas','church','clinic',
    'd','dasara','december','did you finish homework','do you have money','do you want something to drink.gif',
    'do you watch tv','dont worry','e','f','flower is beautiful','good afternoon','good morning','good question','grapes','h','hello','hello what is your name','hindu','hyderabad','i am a clerk','i am fine','i am sorry',
    'i am thinking','i am tired','i go to a theatre','i had to say something but i forgot','i like pink colour','i love to shop','job','july','june','karnataka','kerala','krishna','l','lets go for lunch','m','mango','may','mile','mumbai','nagpur','nice to meet you','open the door','p','pakistan','please call me later','please wait for sometime','police station','post office','pune','punjab','saturday','shall I help you','shall we go together tommorow','shop','sign language interpreter','sit down','stand up','t','take care','temple','there was traffic jam','thursday','toilet','tomato','tuesday','usa','village','wednesday','what are you doing','what is the problem', "what is today's date",'what is your father do','what is your mobile number','what is your name','whats up','where is the bathroom','where is the police station','you are wrong','z'
]

function record() {
    let recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-IN';

    recognition.onresult = function (event) {
        console.log(event)
        document.getElementById('speechToText').value = event.results[0][0].transcript;
    }
    recognition.start();
}

function add(event) {

    const text = document.getElementById("speechToText").value;
    const td = document.getElementById("tableHeader");
    let parent = document.getElementById("list");
    parent.innerHTML = "";
    td.innerHTML = text;
    for (word in text.split(' ')) {
        const newWord = text.split(' ')[word].charAt(0).toUpperCase() + text.split(' ')[word].slice(1).toLowerCase();
        if (!stop_word.includes(text.split(' ')[word].toLowerCase())) {
            let newli = document.createElement("li");
            newli.innerText = newWord;
            newli.id = word;
            parent.appendChild(newli);
        }
    }
}

function play() {
    const text = document.getElementById("speechToText").value;
    const gif = document.getElementById("gifPlayer");
    const video = document.getElementById("videoPlayer");
    if (isl_gif.includes(text.toLowerCase().trim())) {
        const gif = document.getElementById("gifPlayer");
        const video = document.getElementById("videoPlayer");
        gif.hidden = false;
        video.hidden = true;
        gif.src = `ISL_Gifs/${text.toLowerCase().trim()}.gif`
        return;
    }
    gif.hidden = true;
    video.hidden = false;
    let videoSource = new Array();
    let videos = document.getElementById("list").getElementsByTagName("li");
    let j;
    for (j = 0; j < videos.length; j++) {
        videoSource[j] = "assets/" + videos[j].innerHTML + ".mp4";
    }

    let i = 0; // define i
    let videoCount = videoSource.length;

    function videoPlay(videoNum) {
        document.getElementById("list").getElementsByTagName("li")[videoNum].style.color = "#09edc7";
        document.getElementById("list").getElementsByTagName("li")[videoNum].style.fontSize = "xx-large";
        document.getElementById("videoPlayer").setAttribute("src", videoSource[videoNum]);
        document.getElementById("videoPlayer").load();
        document.getElementById("videoPlayer").play();

    }
    document.getElementById('videoPlayer').addEventListener('ended', myHandler, false);
    document.getElementById("list").getElementsByTagName("li")[0].style.color = "#09edc7";
    document.getElementById("list").getElementsByTagName("li")[0].style.fontSize = "xx-large";

    videoPlay(0); // play the video

    function myHandler() {
        document.getElementById("list").getElementsByTagName("li")[i].style.color = "#feda6a";
        document.getElementById("list").getElementsByTagName("li")[i].style.fontSize = "20px";
        i++;
        if (i == videoCount) {
            document.getElementById("videoPlayer").pause();
        }
        else {
            videoPlay(i);
        }
    }
}

function playPause() {
    if (document.getElementById("videoPlayer").paused) {
        play();
    }
    else {
        document.getElementById("videoPlayer").pause();
    }
}

let close_btn=document.getElementById("btn");
if(close_btn){
setTimeout(function() {
    document.getElementById("flash").style.display = "none";
  }, 2000);
}