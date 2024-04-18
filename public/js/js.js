let stop_word = ["mightn't", 're', 'wasn', 'wouldn', 'be', 'has', 'that', 'does', 'shouldn', 'do', "you've", 'off', 'for', "didn't", 'm', 'ain', 'haven', "weren't", 'are', "she's", "wasn't", 'its', "haven't", "wouldn't", 'don', 'weren', 's', "you'd", "don't", 'doesn', "hadn't", 'is', 'was', "that'll", "should've", 'a', 'then', 'the', 'mustn', 'i', 'nor', 'as', "it's", "needn't", 'd', 'am', 'have', 'hasn', 'o', "aren't", "you'll", "couldn't", "you're", "mustn't", 'didn', "doesn't", 'll', 'an', 'hadn', 'whom', 'y', "hasn't", 'itself', 'couldn', 'needn', "shan't", 'isn', 'been', 'such', 'shan', "shouldn't", 'aren', 'being', 'were', 'did', 'ma', 't', 'having', 'mightn', 've', "isn't", "won't"]

let isl_gif = ['any questions', 'are you angry', 'are you busy', 'are you hungry', 'are you sick', 'be careful',
    'can we meet tomorrow', 'did you book tickets', 'did you finish homework', 'do you go to office', 'do you have money',
    'do you want something to drink', 'do you want tea or coffee', 'do you watch TV', 'dont worry', 'flower is beautiful',
    'good afternoon', 'good evening', 'good morning', 'good night', 'good question', 'had your lunch', 'happy journey',
    'hello what is your name', 'how many people are there in your family', 'i am a clerk', 'i am bore doing nothing',
    'i am fine', 'i am sorry', 'i am thinking', 'i am tired', 'i dont understand anything', 'i go to a theatre', 'i love to shop',
    'i had to say something but i forgot', 'i have headache', 'i like pink colour', 'i live in nagpur', 'lets go for lunch', 'my mother is a homemaker',
    'my name is john', 'nice to meet you', 'no smoking please', 'open the door', 'please call me later',
    'please clean the room', 'please give me your pen', 'please use dustbin dont throw garbage', 'please wait for sometime', 'shall I help you',
    'shall we go together tommorow', 'sign language interpreter', 'sit down', 'stand up', 'take care', 'there was traffic jam', 'wait I am thinking',
    'what are you doing', 'what is the problem', 'what is todays date', 'what is your father do', 'what is your job',
    'what is your mobile number', 'what is your name', 'whats up', 'when is your interview', 'when we will go', 'where do you stay',
    'where is the bathroom', 'where is the police station', 'you are wrong', 'address', 'agra', 'ahemdabad', 'all', 'april', 'assam', 'august', 'australia', 'badoda', 'banana', 'banaras', 'banglore',
    'bihar', 'bihar', 'bridge', 'cat', 'chandigarh', 'chennai', 'christmas', 'church', 'clinic', 'coconut', 'crocodile', 'dasara',
    'deaf', 'december', 'deer', 'delhi', 'dollar', 'duck', 'febuary', 'friday', 'fruits', 'glass', 'grapes', 'gujrat', 'hello',
    'hindu', 'hyderabad', 'india', 'january', 'jesus', 'job', 'july', 'july', 'karnataka', 'kerala', 'krishna', 'litre', 'mango',
    'may', 'mile', 'monday', 'mumbai', 'museum', 'muslim', 'nagpur', 'october', 'orange', 'pakistan', 'pass', 'police station',
    'post office', 'pune', 'punjab', 'rajasthan', 'ram', 'restaurant', 'saturday', 'september', 'shop', 'sleep', 'southafrica',
    'story', 'sunday', 'tamil nadu', 'temperature', 'temple', 'thursday', 'toilet', 'tomato', 'town', 'tuesday', 'usa', 'village',
    'voice', 'wednesday', 'weight', 'please wait for sometime', 'what is your mobile number', 'what are you doing', 'are you busy']


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