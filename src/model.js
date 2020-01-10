class model{
	instance_ = null;
	constructor(){
        this.dice = {
            sides: 6,
            roll: function () {
                var randomNumber = Math.floor(Math.random() * this.sides) + 1;
                return randomNumber;
            }
        }

        this.dice_value = 0;

        this.player1_active = false;
        this.player2_active = false;
        this.player3_active = false;
        this.player4_active = false;

        this.categories = [27, 22, 23, 21];
        this.categories_text = ["Animals", "Geography", "History", "Sports"];

        this.players = [];

        this.questions = [[],[],[],[]];
        this.min_questions = 10;
        this.max_questions = 20;

        this.baseURL = "https://opentdb.com/";
		this.token = null;
        
        localStorage.clear();
        if(localStorage.questions === undefined){
        	console.log("Fetching Questions");
	        for(var category of this.categories){
	        	for(var i = 0; i < this.max_questions; i++){
		        	this.fetchQuestion(category);    
	        	} 	
	        }
        }
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
	fetchQuestion(category){
	    if(this.token == null){
	    	this.sessionToken();
	    }
	    
	    var url = this.baseURL + "api.php?amount=1&type=multiple&category=" + category;
	    var req = new XMLHttpRequest();
	    req.onreadystatechange = function(){
	        if(req.readyState==4){
	            if(req.status==200){
	                var response = JSON.parse(req.responseText);
	                if(response.response_code == 0){
	                    model.instance().saveQuestion(JSON.parse(req.responseText));
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


	saveQuestion(data){
		var m = model.instance();
		if(localStorage.questions !== undefined){
			m.questions = JSON.parse(localStorage.questions);
		}
		var question_data = data.results[0];
		var index = m.categories_text.indexOf(question_data.category);
		m.questions[index].push(question_data);
		localStorage.questions = JSON.stringify(m.questions);
	}


	getQuestion(category){
		var index = model.instance().categories.indexOf(category);

		this.questions = JSON.parse(localStorage.questions);
		var result = this.questions[index][0];
		this.questions[index].splice(0, 1);
		localStorage.questions = JSON.stringify(this.questions);

		if(this.questions[index].length < this.min_questions){
			console.log("Fetching Questions");
			for(var i = this.questions[index].length; i < this.max_questions; ++i){
				this.fetchQuestion(category);
			}
		}

		var num = Math.floor(Math.random() * 4);
		result.cpos = num;
	    var j = 0;
	    var letter = 'a';
	    const answers = [];
	    const output = [];

	    // for(var i = 0; i < 4; i++){
	    //     if(i == num){
	    //     answers.push(`<label class="answer_box">
	    //         <input type="radio" id="answer_${i}" class=answer_radio_buttons" name="answer" value="correct">
	    //         ${letter}:
	    //         ${result.correct_answer}
	    //         </label>`);
	    //     }else{
	    //         answers.push(`<label class="answer_box">
	    //             <input type="radio" id="answer_${i}" class="answer_radio_buttons" name="answer" value="incorrect">
	    //             ${letter}:
	    //             ${result.incorrect_answers[j]}
	    //             </label>`);
	    //         j++;
	    //     }
	    //     letter = this.nextChar(letter);
	    // }

	    // output.push(
	    //     `<div class="question" id="question"> ${result.question} </div>
	    //     <div class="answers"> ${answers.join('')} </div>`
	    //   );

		// document.getElementById("text_question").innerHTML = output.join('');
		document.getElementById("question").innerHTML = result.question;
		
		for(var i = 0; i< 4; i++){
			if(i==num){
				var answer = letter + ": " + result.correct_answer;
				document.getElementById("label_"+i).innerHTML = answer;
				document.getElementById("answer_"+i).value = "correct";
			}else{
				var answer = letter + ": " + result.incorrect_answers[j];
				document.getElementById("label_"+i).innerHTML = answer;
				document.getElementById("answer_"+i).value = "incorrect";
				j++;
			}
			letter = this.nextChar(letter);
		}
				   
		return result;
	}


	checkAnswer(){
	    var answers = document.getElementsByName("answer");
	    for(var a of answers)
	    {
	        if (a.checked && a.value == "correct") {
	            return true;
	        }
	    }
	    return false;
	}


	sessionToken(){
	    var url = this.baseURL + "api_token.php?command=request";
	    var req = new XMLHttpRequest()
	    req.onreadystatechange = function(){
	        if(req.readyState==4){
	            if(req.status==200){
	                var response = JSON.parse(req.responseText);
	                if(response.response_code == 0){
	                    this.token = response.token;
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


	nextChar(c){
	    return String.fromCharCode(c.charCodeAt(0) + 1);
	}


    setNewDiceNumber(field)
    {
        this.dice_value = this.dice.roll();
        field.innerHTML = this.dice_value;
    }


	static instance(){
		if(model.instance_ == null){
			model.instance_ = new model();
			return model.instance_;
		}
		else{
			return model.instance_;
		}
	}
}