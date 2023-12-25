let connection = new WebSocket('wss://PrisonersDilemma.Bromanned.repl.co', "this-is-probably-a-protocol");

let username = "Client " + Math.floor(Math.random() * 1000000);


function cooperate() {
    document.getElementById("cooperateBtn").disabled = true;
    document.getElementById("defectBtn").disabled = false;
    document.getElementById("selected").innerText = "COOPERATE";
}

function defect() {
    document.getElementById("cooperateBtn").disabled = false;
    document.getElementById("defectBtn").disabled = true;
    document.getElementById("selected").innerText = "DEFECT";
}
