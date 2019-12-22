
var baseURL = "https://opentdb.com/";
var token = null;


document.getElementById("button").onclick = function(){
    getQuestion(9);
};



function updateQuestion(data){
    document.getElementById("test").innerHTML = data.results[0].question;
}




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
    var url = baseURL + "api.php?amount=1&category="+category;
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
