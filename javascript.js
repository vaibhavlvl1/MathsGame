var playing = false;
var score;
var action;
var timeremaining;
var correct_answer;

document.getElementById("startreset").onclick = function(){
    if (playing == true){
        location.reload();
    }
    else{
        hide("gameover");
        playing = true;
        score = 0;

        document.getElementById("scorevalue").innerHTML = score;
        show("timeremaining")
        timeremaining = 60;
        
        document.getElementById("startreset").innerHTML = "Reset";
        
        start_countdown();

        generate_QA();
    }
}


for(i=1;i<5;i++){
    document.getElementById("box"+i).onclick = function(){
        if(playing==true){
            if (this.innerHTML==correct_answer){
                score++;
                document.getElementById("scorevalue").innerHTML=score;
                hide("wrong")
                show("correct");
                setTimeout(function(){
                    hide("correct");
                },1000);
                generate_QA()
            }
            else{
    
                hide("correct")
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                },1000);
                
            }
        }
    }
}


function start_countdown(){
    action = setInterval(function(){timeremaining-=1;
                                    document.getElementById("timeremainingvalue").innerHTML = timeremaining;
                                if (timeremaining==0){
                                    stop_countdown();
                                    show("gameover");

                                    document.getElementById("gameover").innerHTML = "<p>Game Over</p><p>Your Score is "+ score+". </p>";

                                    hide("timeremaining");
                                    hide("correct");
                                    hide("wrong");
                                    playing = false;
                                    document.getElementById("startreset").innerHTML="Start Game";
                                    
                                }},1000);
}

function stop_countdown(){
    clearInterval(action);
}

function hide(id){
    document.getElementById(id).style.display="none";
}

function show(id){
    document.getElementById(id).style.display="block";
}

function generate_QA(){
    var x = 1 + Math.round(9*Math.random());
    var y = 1 + Math.round(9*Math.random());
    correct_answer = x*y;

    document.getElementById("question").innerHTML=x+" x "+y;

    var correct_position = Math.round(3*(Math.random()))+1

    document.getElementById("box"+correct_position).innerHTML = correct_answer;

    var answers=[correct_answer];
    
    for(i=1;i<5;i++){
        if (i!= correct_position){
            var wrong_answer;
            do{
                wrong_answer = (1 + Math.round(9*Math.random()))*(1 + Math.round(9*Math.random())) ;
            }
            while(answers.indexOf(wrong_answer)>-1)

            document.getElementById("box"+i).innerHTML=wrong_answer;
            answers.push(wrong_answer)
        }
    }


}