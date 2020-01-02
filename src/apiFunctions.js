
var baseURL = "https://opentdb.com/";
var token = null;


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


// "trivia_categories":
//       9,  "General Knowledge"
//       10, "Entertainment: Books"
//       11, "Entertainment: Film"
//       12, "Entertainment: Music"
//       13, "Entertainment: Musicals & Theatres"
//       14, "Entertainment: Television"
//       15, "Entertainment: Video Games"
//       16, "Entertainment: Board Games"
//       17, "Science & Nature"
//       18, "Science: Computers"
//       19, "Science: Mathematics"
//       20, "Mythology"
//       21, "Sports"
//       22, "Geography"
//       23, "History"
//       24, "Politics"
//       25, "Art"
//       26, "Celebrities"
//       27, "Animals"
//       28, "Vehicles"
//       29, "Entertainment: Comics"
//       30, "Science: Gadgets"
//       31, "Entertainment: Japanese Anime & Manga"
//       32, "Entertainment: Cartoon & Animations"
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
            <input type="radio" name="answer" value="correct">
            ${letter}:
            ${question_data.correct_answer}
            </label>`);
        }else{
            answers.push(`<label>
                <input type="radio" name="answer" value="incorrect">
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


function checkAnswer(){
}


function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}
