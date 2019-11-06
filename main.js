TweenLite.defaultEase = Expo.easeOut;

// initTimer("00:08"); // other ways --> "0:15" "03:5" "5:2"
var reloadBtn = document.querySelector('.reload');
var timerEl = document.querySelector('.timer');
var array = [{
    name:"Anuj Jhawar",
    phone : "7000872208",
    email:"anujjhawar28@gmail.com"
},
{
    name:"Mayank Jhawar",
    phone : "9407393303",
    email:"mayankjhawar18@gmail.com"
},
{
    name:"Mamta Jhawar",
    phone : "9424082243",
    email:"mamtajhawar2015@gmail.com"
},
{
    name:"Sudhir Jhawar",
    phone : "9406833303",
    email:"sudhirjhawar2015@gmail.com"
}
];

function arrayLoop(i){
    console.log("Value of i is : "+ i);
    var j; 
    for(j=i;j<i+1;j++){
        var json = array[j];
        document.getElementById("name").innerHTML=json.name;
        document.getElementById("email").innerHTML=json.email;
        document.getElementById("phone").innerHTML=json.phone;
        initTimer("00:09",j,0,json.name);
    }
}
arrayLoop(0);

function initTimer (t,i,type,name) {
    console.log("initTimer Called.");
    console.log("t  :"+ t + " i : "+ i + " type : "+type+" name : "+ name);
    if(i!=undefined || name!=undefined || type!=undefined){
        var self = this,
        timerEl = document.querySelector('.timer'),
        minutesGroupEl = timerEl.querySelector('.minutes-group'),
        secondsGroupEl = timerEl.querySelector('.seconds-group'),
 
        minutesGroup = {
           firstNum: minutesGroupEl.querySelector('.first'),
           secondNum: minutesGroupEl.querySelector('.second')
        },
 
        secondsGroup = {
           firstNum: secondsGroupEl.querySelector('.first'),
           secondNum: secondsGroupEl.querySelector('.second')
        };
 
    var time = {
       min: t.split(':')[0],
       sec: t.split(':')[1]
    };
 
    var timeNumbers;
 
    function updateTimer() {
        console.log("updateTimer Called.");
       var timestr;
       var date = new Date();
 
       date.setHours(0);
       date.setMinutes(time.min);
       date.setSeconds(time.sec);
 
       var newDate = new Date(date.valueOf() - 1000);
       var temp = newDate.toTimeString().split(" ");
       var tempsplit = temp[0].split(':');
 
       time.min = tempsplit[1];
       time.sec = tempsplit[2];
 
       timestr = time.min + time.sec;
       timeNumbers = timestr.split('');
       updateTimerDisplay(timeNumbers);
 
       if(timestr === '0000' && type==0){
        console.log("IF Called timestr === '0000' && type==0 ");
        playAlarm();
        setTimeout(function(){
            alert("Thanks "+ name);
        },2000);   
        clearTimeout();
        setTimeout(function(){
            document.getElementById('name').innerHTML = '';
            document.getElementById('phone').innerHTML = '';
            document.getElementById('email').innerHTML = '';
        },3000);
        clearTimeout();
        setTimeout(function(){
            initTimer("00:06",i,1,name);
        },1000);
       }
       
       if(timestr === '0000' && type==1){
        clearTimeout();
        setTimeout(function(){
            alert("Welcome Next Member");
        },1000); 
        setTimeout(function(){
            arrayLoop(i+1);
        },2000);
       }

       if(timestr != '0000')
        setTimeout(updateTimer, 1000);
    }
 
    function updateTimerDisplay(arr) {
 
       animateNum(minutesGroup.firstNum, arr[0]);
       animateNum(minutesGroup.secondNum, arr[1]);
       animateNum(secondsGroup.firstNum, arr[2]);
       animateNum(secondsGroup.secondNum, arr[3]);
 
    }
 
    function animateNum (group, arrayValue) {
 
       TweenMax.killTweensOf(group.querySelector('.number-grp-wrp'));
       TweenMax.to(group.querySelector('.number-grp-wrp'), 1, {
          y: - group.querySelector('.num-' + arrayValue).offsetTop
       });
 
    }
    
    setTimeout(updateTimer, 1000);
    }
}

// function countdownFinished(t,i,type,name) {
//     console.log("countdownFinished Called.");
//     if(i!=undefined || type==1 || name!=undefined){
//         console.log("countdownFinished if Condition Called.");
//         clearTimeout();
//         setTimeout(function(){
//             initTimer(t,i,1,name);
//         },3000);
//     }
// }

function playAlarm() {
    console.log("Alarm Played");
    alarmSound = new Audio("alarm.wav");
    setTimeout(function(){
        alarmSound.pause();
        alarmSound.startTime =0;
    },3000);
    alarmSound.play();
}; 




