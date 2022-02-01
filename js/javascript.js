console.log("I ready to start code to gamme");
"use strict";
let time_remainings = document.getElementById("time_remainings");
let gameover = document.getElementById("gameover");
let gameshadow = document.getElementById("gameshadow");
let reset = document.getElementById("reset");
let start = document.getElementById("start");
let next = document.getElementById("next");
let btnok = document.getElementById("btnok");
let btncancle = document.getElementById("btncancle");
let nextbox = document.getElementById("nextbox");
let question_box = document.getElementById("question_box");
let correctAnswer;
let score = 0;
let st = 0;
let timeinterval;
let tvalue;
let t;

document.getElementById("startmainbtn").addEventListener("click",()=>{
    show("main");
    hide("startmain");
    tvalue = document.getElementById("times").value;
    t =tvalue;
    // console.log(t)
})


function countdown(){
    let timeremains = t -1;
    t= timeremains;
    if(t<0){
        clearInterval(timeinterval);
        document.getElementById("scorevalue").innerHTML = score;
        document.getElementById("gameoverreason").innerHTML="Time out please try again.";
        document.getElementById("realscore").innerHTML = score;
        document.getElementById("sptime").innerHTML = st;
        gameover.style.display ="block";
        gameshadow.style.display = "block";
    }else if(nextbox.style.display == "block"){
        clearInterval(timeinterval);
        t= timeremains+1;
    }else{

        time_remainings.children[0].innerHTML = t;
    }

}
let spendtime;


function spend(){
    spendtime = setInterval(() => {
        st+=1;
        if(nextbox.style.display == "block"){
            clearInterval(spendtime);
            
        }
        // console.log(st);
    }, 1000);
}
// spend();
//function for timer
function timer(){
   
    timeinterval = setInterval(countdown, 1000);
}

//timer function close

//reset game
reset.addEventListener("click",()=>{
    location.reload();
    
    // gameover.style.display ="none";
    // gameshadow.style.display = "none";
    // next.style.display = "none";
    // nextbox.style.display = "none";
    // time_remainings.style.display="none";
    // start.style.display="block";
})
//end reset game

//start button function

start.addEventListener("click",()=>{
    // time_remainings.children[0].innerHTML = "60";
    // clearInterval(timeinterval);
    time_remainings.children[0].innerHTML = t;
    timer();
    spend();
    next.style.display = "block";
    time_remainings.style.display="block";
    start.style.display="none";

    //generating a question
    generatequestion();
    checkanswer();
})
    function generatequestion(){
        let x =1 + Math.round(Math.random()*9);
        let y =1 + Math.round(Math.random()*9);
        correctAnswer = x*y;
        question_box.innerHTML = x +" x "+y;

        //fill question in bbox
        let boxposition = 1 + Math.round(Math.random()*3);
        document.getElementById("answer"+boxposition).innerHTML = correctAnswer;
        let answer = [correctAnswer];
        //generate random answer
        for(let i = 1;i<5;i++){
           
            if(i!== boxposition){
                let wronganswer;
                do{
                    let x =1 + Math.round(Math.random()*9);
                    let y =1 + Math.round(Math.random()*9);
                    wronganswer = x*y;
                    if(wronganswer==correctAnswer){
                        let x =1 + Math.round(Math.random()*9);
                    let y =1 + Math.round(Math.random()*9);
                    wronganswer = x*y;
                    }
                }while(answer.indexOf(wronganswer)>-1)
                answer.push(wronganswer);
                
            document.getElementById("answer"+i).innerHTML = wronganswer;
            }
        }
        
    }
    // generatequestion();
    //check question
    let maxtry =0;
    function checkanswer(){
        for(let i=1;i<5;i++){
        document.getElementById("answer"+i).addEventListener("click",(e)=>{
            let canswer = e.target.innerHTML;
            if(canswer==correctAnswer){
                show("correct");
                maxtry = 0;
                score+=1;
                document.getElementById("scorevalue").innerHTML = score;
                document.getElementById("realscore").innerHTML = score;
                setTimeout(()=>{
                    hide("correct");
                },1000)
                generatequestion();
            }else{
                show("tryagain");
                maxtry+=1;
                if(score>0){
                    score-=1;
                    document.getElementById("scorevalue").innerHTML = score;
                    document.getElementById("realscore").innerHTML = score;
                }else if(score==0){
                    document.getElementById("realscore").innerHTML = 0;
                }
                setTimeout(()=>{
                    hide("tryagain");
                },1000)
                // console.log(maxtry);
                if(maxtry==2){
                    document.getElementById("gameoverreason").innerHTML="Maximum time you select wrong answer. try again";
                    document.getElementById("scorevalue").innerHTML = score;
                    document.getElementById("sptime").innerHTML = st;
                    show("gameover")
                    clearInterval(timeinterval);
                }
                // generatequestion();
            }
           
        })
    }
    }
    // checkanswer();

//start button function end
    function show(id){
        document.getElementById(id).style.display ="block";
    }
    function hide(id){
        document.getElementById(id).style.display ="none";
    }
//next button function start
next.addEventListener("click",function(){
    clearInterval(spendtime);

    nextbox.style.display ="block"
    for(let i=1;i<5;i++){
        document.getElementById("answer"+i).style.pointerEvents ="none";
    }
})
//custome button 
btnok.addEventListener("click",(e)=>{
    document.getElementById("gameoverreason").innerHTML="your reason to end game";
    document.getElementById("scorevalue").innerHTML = 0;
    document.getElementById("sptime").innerHTML = st;
    gameover.style.display ="block";
    gameshadow.style.display = "block";
    // console.log(e)
})
btncancle.addEventListener("click",(e)=>{
    // console.log(e.target.value)
    timer();
    spend();
    nextbox.style.display ="none";
})

//next button function end
