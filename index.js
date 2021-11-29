document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    console.log("received deviceready");
    document.getElementById('deviceready').classList.add('ready');
    document.getElementById("button1").addEventListener("click", signin);
    document.getElementById("button2").addEventListener("click", query);
}

var token;

function signin() {
    console.log("function signin");
    document.getElementById("text1").innerHTML = "Signing in ...";

    fetch ("https://apisandbox.openbankproject.com/my/logins/direct", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'DirectLogin username="anil.uk.29@example.com",password="588848",consumer_key="..."'
        }
    })
    
    .then((response) => {
            return response.json()
    })
    .then((data) => {
        console.log("in signin fetch received");
        console.log(data);
        if (data.code == 401) {
            console.log('in signin error - ' + data.message);
            document.getElementById("text1").innerHTML = "Login not successful. " + data.message;}
        else {
            console.log('in signin token received');
            document.getElementById("text1").innerHTML = "Successful login. Token: " + data.token;
        token = data.token;}
        
    })
    .catch((error) => {
        console.log("in signin error");
        console.log('Error:', error);
        document.getElementById("text1").innerHTML = "Hmm. We are having trouble completing your request. Check your network connection.";
    });

}

function query() {
    console.log("function query");
    document.getElementById("text2").innerHTML = "Querying ...";

    fetch ("https://apisandbox.openbankproject.com/obp/v4.0.0/banks/gh.29.uk/accounts/private", {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'DirectLogin token=' + token
        }
    })

    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log("in query success");
        console.log(data);
        document.getElementById("text2").innerHTML = "Query successful";
    })
    .catch((error) => {
        console.log("in query error");
        console.log('Error:', error);
        document.getElementById("text2").innerHTML = "Query unsuccessful :(";
    });

}