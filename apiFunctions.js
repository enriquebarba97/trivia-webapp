
var baseURL = "https://opentdb.com/";
var token = null;


document.getElementById("button").onclick = function(){
    getQuestion(9);
};


function sessionToken(){
    var url = baseURL + "api_token.php?command=request";
    var req = new XMLHttpRequest()
    req.onreadystatechange = function(){
        if(req.readyState==4){
            if(req.status==200){
                var response = JSON.parse(req.responseText);
                if(response.response_code == 0){
                    token = response.token;
                }else{
                    alert("Server error: " + response.response_message);
                }
            }else{
                alert("Server error: " + response.response_message);
            }
        }
    }
    req.open("get", url, true);
    req.send(null);
}

function getQuestion(category){
    if(token==null){sessionToken();}
    var url = baseURL + "api.php?amount=1&type=multiple&category="+category;
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if(req.readyState==4){
            if(req.status==200){
                var response = JSON.parse(req.responseText);
                if(response.response_code == 0){
                    updateQuestion(JSON.parse(req.responseText));
                }else{
                    alert("Server error: " + response.response_message);
                }
            }else{
                alert("Server error: " + response.response_message);
            }
        }
    }
    req.open("get", url, true);
    req.send(null);
}

function updateQuestion(data){

    var num = Math.floor(Math.random()*4);
    var j = 0;
    var letter = 'a';
    const answers = [];
    const output = [];
    question_data = data.results[0]

    for(var i=0;i<4;i++){
        if(i==num){
        answers.push(`<label>
            <input type="radio" name="question${i}" value="correct">
            ${letter}:
            ${question_data.correct_answer}
            </label>`);
        }else{
            answers.push(`<label>
                <input type="radio" name="question${i}" value="incorrect">
                ${letter}:
                ${question_data.incorrect_answers[j]}
                </label>`);
            j++;
        }
        letter = nextChar(letter);
    }

    output.push(
        `<div class="question"> ${question_data.question} </div>
        <div class="answers"> ${answers.join('')} </div>`
      );

    document.getElementById("quiz").innerHTML = output.join('');
}

function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}
