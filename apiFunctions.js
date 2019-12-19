
var baseURL = "https://opentdb.com/";
var token = null;


function sessionToken(){
    var url = baseURL + "api_token.php?command=request";
    var req = new XMLHttpRequest()
    req.onreadystatechange = function(){
        if(req.readyState==4 && req.status==200){
            var response = JSON.parse(req.responseText);
            if(response.response_code == 0){
                token = response.token;
            }else{
                alert("Server error: " + response.response_message);
            }
        }else{
            alert("There was a problem contacting with the server: "+ req.statusText);
        }
    }
    req.open("get", url, true);
    req.send(null);
}

function getQuestion(category){
    var url = baseURL + "api.php?amount=1&category="+category;
    var req = new XMLHttpRequest()
    req.onreadystatechange = updateQuestion()
    req.open("get", url, true);
    req.send(null);
}