let connection = new WebSocket('wss://PrisonersDilemma.Bromanned.repl.co', "this-is-probably-a-protocol");

let username = "Client " + Math.floor(Math.random() * 1000000);
let points = 0;

connection.onopen = function () {
    usernamePrompt = prompt("Please enter a username before playing.");
    if (usernamePrompt != "" && usernamePrompt != null) {
        username = usernamePrompt;
    }
    
    connection.send(JSON.Stringify(Update.new("UserChange", username, null)));
    document.getElementById("username").innerText = "Username: " + username;
}

connection.onmessage = function (update) {
    alert(JSON.parse(update).toString());
    Update.interpret(update);
}

connection.onclose = function () {
    connection.send(JSON.Stringify(Update.new("UserChange", username, "left")));
}

function cooperate() {
    document.getElementById("cooperate").disabled = true;
    document.getElementById("defect").disabled = false;
    document.getElementById("selected").innerText = "COOPERATE";
    document.getElementById("selected").style.color = "green";
    connection.send(Update.new("Choice", username, "COOPERATE"));
}

function defect() {
    document.getElementById("cooperate").disabled = false;
    document.getElementById("defect").disabled = true;
    document.getElementById("selected").innerText = "DEFECT";
    document.getElementById("selected").style.color = "red";
    connection.send(Update.new("Choice", username, "DEFECT"));
}

const Update = {
    new: function (type, sender, choice) {
        let updateToSend = {
            type: type,
            sender: sender,
            choice: choice
        }

        updateToSend = JSON.stringify(updateToSend);
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
    if (user == null || (user != null && choice == "left")) {
        document.getElementById("info").innerText = "Waiting for other players to join...";
    } else {
        document.getElementById("info").innerText = "Playing Against " + user;
    }
}

function updatePoints(enemyChoice) {
    let youreGood = document.getElementById("selected").innerText == "COOPERATE"
    if (enemyChoice == "COOPERATE" && youreGood) {
        points += 3;
    } else if (enemyChoice == "COOPERATE" && !youreGood) {
        points += 5;
    } else if (enemyChoice == "DEFECT" && !youreGood) {
        points += 1;
    }

    document.getElementById("points").innerText = "Points: " + points + " ";
}
