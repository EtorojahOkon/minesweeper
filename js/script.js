var score = 0;
var arr = [];
var states = [0, 1];

function startGame() {
    var z = prompt("Please input number of squares ina row");
    document.getElementById("cur_score").innerHTML = 0;
    clearGrid();
    createGrid(z);
}

function clearGrid() {
    $(".grid").remove();
}

function createGrid(no) {
    var z = no * no;
    for (var rows = 0; rows < no; rows++) {
        for (var columns = 0; columns < no; columns++) {

            var grid = document.createElement("img");
            grid.className = "grid";
            document.getElementById("container").appendChild(grid)
        }
        $(".grid").width(960 / no);
        $(".grid").attr("onclick", "sweep(this.id)");
        $(".grid").height(960 / no)
    }

    for (let k = 0; k < z; k++) {
        arr.push(states[Math.floor(Math.random() * states.length)]);
    }

    var boxes = document.getElementsByClassName("grid");
    for (let l = 0; l < boxes.length; l++) {
        boxes[l].setAttribute("id", l);

    }



}

function sweep(id) {
    var res = arr[id];
    document.getElementById(id).removeAttribute("onclick");
    if (res == 1) {
        document.getElementById(id).style.backgroundColor = "white";
        score++;
        document.getElementById("cur_score").innerHTML = score;
    } else {
        endGame();
    }
}

function endGame() {
    removeA();
    setTimeout(() => {
        $("#end").show();
    }, 2000);
    document.getElementById('amt').innerHTML = score;
    scoreGame();
}

function removeA() {
    var boxes = document.getElementsByClassName("grid");
    for (let l = 0; l < boxes.length; l++) {
        boxes[l].removeAttribute("onclick");
        if (arr[l] == 0) {
            boxes[l].setAttribute("src", "./img/mine.jpg");
        }

    }
}

function scoreGame() {
    var a = parseInt(localStorage.getItem("highscore"));
    if (score > a) {
        document.getElementById("newhigh").innerHTML = '<h3 style="color:green;">New high Score</h3>'
        localStorage.setItem('highscore', score);
    }
}

function init() {
    var a = localStorage.getItem("highscore");
    if (a == null || a == '') {
        localStorage.setItem("highscore", 0);
        document.getElementById("sc-value").innerHTML = 0
    } else {
        document.getElementById("sc-value").innerHTML = a;
    }

}