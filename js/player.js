var mute = 0;                       //to track mute btn
var start = 0;                      //to track play btn
var imageCarrier = document.querySelector('#img-carrier');      //div that contains image
var timerid = 0;                    //var to use later
var audio = new Audio('img/sound.mp3');         //load audio
audio.loop = true;
var audioVal = 0;                   //Audio progress
var progressbar = document.querySelector('.progress-bar');
progressbar.value = audioVal;


/****************************************** handling Mouse events Just like vLC Player *********************/
if('ontouchstart' in document){//check for touch device
    //behaviour and events for touch device
    console.log('Device has touchscreen');
    var mainscreen = document.querySelector('.screen'); 
    mainscreen.ontouchstart = function(){
        console.log('touching');
        let playBtn = document.querySelector('#play-btn');
        playBtn.style.visibility = 'visible'
        
    };
    
    mainscreen.ontouchend = function(){
        if(start % 2 === 0){
            return;
        }
        console.log('not-touching');
        let playBtn = document.querySelector('#play-btn');
        setTimeout(function(){ 
            playBtn.style.visibility = 'hidden'; 
        }, 2000);
        
    };
}
else{
    //behaviour and events for pointing device like mouse
    var mainscreen = document.querySelector('.screen'); 
    mainscreen.onmouseenter = function(){
        console.log('hovering');
        let playBtn = document.querySelector('#play-btn');
        playBtn.style.visibility = 'visible'
        
    };

    mainscreen.onmouseleave = function(){
        if(start % 2 === 0){
            return;
        }
        console.log('hovering');
        let playBtn = document.querySelector('#play-btn');
        setTimeout(function(){ 
            playBtn.style.visibility = 'hidden'; 
        }, 1000);
        
    };
}


/************************************************************************************************************ */

var images = [];                    //create array of images
x = 1;
images[0] = "img/i1.png";
images[1] = "img/i2.png";
images[2] = "img/i3.png";

function audioBtn(element){         //mute button handler
    console.log(element);
    if(mute % 2 === 0 ){
        element.innerHTML = " ";
        element.innerHTML = `<i class="fas fa-volume-mute"></i>`        //change icon on mute
        console.log('muted');
        audio.muted = true;
        mute++;
    }
    else{
        element.innerHTML = " ";
        element.innerHTML = `<i class="fas fa-volume-up"></i>`
        console.log('un-muted');
        audio.muted = false;
        mute++;
    }
}

function player(element){                   //player btn handler
    // console.log(element);
    if(start % 2 !== 0 ){
        element.innerHTML = " ";
        element.innerHTML = `<i class="fas fa-play-circle"></i>`            //update play / pause icon
        console.log('status : paused');
        changeImage("paused");              //pass paused to changeImage function
        audio.pause();
        start++;

    }
    else{
        element.innerHTML = " ";
        element.innerHTML = `<i class="fas fa-pause-circle"></i>`
        console.log('status : playing');
        changeImage("playing");             //pass playing to changeImage function
        audio.play();
        start++;
    }
}

function changeImage(status){
    console.log(status);
    if(status === 'playing'){
        timerid = setInterval(function(){       //function to set interval of 3 sec
            imageCarrier.innerHTML = "";
            imageCarrier.innerHTML = `<img src="`+ images[x] +`" id="video-image">`;    //change image
            audioVal = audioVal + 49.99;        //update progressbar value 0 - 50 - 100
            console.log('audio progress : ',audioVal);
            progressbar.value = audioVal;           //update actual progressbar
            x++;                                    //increment index
            console.log('index : ', x);
            var d = new Date();                     //just for checking the seconds
            var n = d.getSeconds();
            console.log("seconds : ",n);

            if(x >= images.length){                 //for looping the images
                x = 0;
            }
            if(audioVal >= 100){                    //for looping the progressbar
                audioVal = 0;
                progressbar.value = audioVal;

            }
        }, 3000);
    }
    else{                                           //when we press pause btn
        clearInterval(timerid);                     //it will remove the interval, but its value will still be in timerid 
        console.log(timerid);
        return;
    }
}