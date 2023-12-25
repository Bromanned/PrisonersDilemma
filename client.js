let connection = new WebSocket('wss://PrisonersDilemma.Bromanned.repl.co', "this-is-probably-a-protocol");

let username = "Client " + Math.floor(Math.random() * 1000000);


function cooperate() {
    document.getElementById("cooperate").disabled = true;
    document.getElementById("defect").disabled = false;
    let selected = document.getElementById("selected");
    selected.innerText = "COOPERATE";
    selected.style.color = "green";
}

function defect() {
    document.getElementById("cooperate").disabled = false;
    document.getElementById("defect").disabled = true;
    let selected = document.getElementById("selected");
    selected.innerText = "DEFECT";
    selected.style.color = "red";
}

const Update = {
    new: function (updateType, data) {
        let updateToSend = {
            type: updateType,
            data: data
        }

        updateToSend = JSON.stringify(updateToSend);
        return updateToSend;
    },
    
    interpret: function (incoming) {
        try {
            var message = JSON.parse(incoming);
            switch (message.type) {
                case "UserJoined":
                    
                    break;
                case "Choice":
                    
                    break;
            }
        } catch (error) {
            console.log(error);
        }
