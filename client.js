let connection = new WebSocket('wss://PrisonersDilemma.Bromanned.repl.co', "this-is-probably-a-protocol");

let username = "Client " + Math.floor(Math.random() * 1000000);


function cooperate() {
    document.getElementById("cooperate").disabled = true;
    document.getElementById("defect").disabled = false;
    document.getElementById("selected").innerText = "COOPERATE";
    document.getElementById("selected").style.color = "green";
}

function defect() {
    document.getElementById("cooperate").disabled = false;
    document.getElementById("defect").disabled = true;
    document.getElementById("selected").innerText = "DEFECT";
    document.getElementById("selected").style.color = "red";
}

