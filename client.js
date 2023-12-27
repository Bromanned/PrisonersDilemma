let connection = new WebSocket('wss://PrisonersDilemma.Bromanned.repl.co', "this-is-probably-a-protocol");

let username = "Client " + Math.floor(Math.random() * 1000000);
let currentChoice = null;
let enemy = null;
let amReady = null;
let points = 0;
let roundNumber = 1;

connection.onopen = function () {
    usernamePrompt = prompt("Please enter a username before playing.");
    if (usernamePrompt != "" && usernamePrompt != null) {
        username = usernamePrompt;
    }
    
    connection.send(Update.new("UserChange", username, null));
    document.getElementById("username").innerText = "Username: " + username;
}

connection.onmessage = function (update) {
    //alert("Update: " + update);
    //alert("toString: " + update.data.toString());
    Update.interpret(update.data.toString());
}

connection.onclose = function (e) {
    connection.send(Update.new("UserChange", username, "disconnect"));
}

function cooperate() {
    document.getElementById("cooperate").disabled = true;
    document.getElementById("defect").disabled = false;
    document.getElementById("selected").innerText = "COOPERATE";
    document.getElementById("selected").style.color = "green";
    currentChoice = "COOPERATE";
}

function defect() {
    document.getElementById("cooperate").disabled = false;
    document.getElementById("defect").disabled = true;
    document.getElementById("selected").innerText = "DEFECT";
    document.getElementById("selected").style.color = "red";
    currentChoice = "DEFECT";
}

function ready() {
    amReady = true;
    connection.send(Update.new("Choice", username, currentChoice));
}

const Update = {
    new: function (type, sender, choice) {
        let updateToSend = {
            type: type,
            sender: sender,
            choice: choice
        }

        updateToSend = JSON.stringify(updateToSend);
        //alert("Sent: " + updateToSend);
        return updateToSend;
    },
    
    interpret: function (incoming) {
        try {
            var incomingUpdate = JSON.parse(incoming);
            if (incomingUpdate.sender == username) return;
            switch (incomingUpdate.type) {
                case "UserChange":
                    updateInfo(incomingUpdate.sender, incomingUpdate.choice)
                    break;
                case "Choice":
                    updatePoints(incomingUpdate.choice)
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    }
}

function updateInfo(user, choice) {
    if (user == null || (user != null && choice == "disconnect")) {
        document.getElementById("info").innerText = "Waiting for other players to join...";
        enemy = null;
    } else {
        //var oldUser = document.getElementById("info").innerText;
        //oldUser = oldUser.replace('Playing Against: ','');
        
        if (user.toString() != enemy) {
            //alert(user.toString());
            //alert(enemy);
            document.getElementById("info").innerText = "Playing Against " + user;
            connection.send(Update.new("UserChange", username, "extraUpdate"));
            enemy = user.toString();
        }
    }
}

function updatePoints(enemyChoice) {
    if (amReady) {
        let youreGood = document.getElementById("selected").innerText == "COOPERATE"
        if (enemyChoice == "COOPERATE" && youreGood) {
            points += 3;
        } else if (enemyChoice == "COOPERATE" && !youreGood) {
            points += 5;
        } else if (enemyChoice == "DEFECT" && !youreGood) {
            points += 1;
        }
        
        document.getElementById("points").innerText = "Points: " + points + " ";
        connection.send(Update.new("Choice", username, currentChoice));
        amReady = false;
        roundNumber++;
        document.getElementById("points").innerText = "Round " + roundNumber;
    }
}
