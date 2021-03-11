//recupérer dans url les parametre largeur et hauteur
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const hauteur = urlParams.get('hauteur')
const largeur = urlParams.get('largeur')

//taille du labyrinthe
let mazeWidth = largeur;
let mazeHeight = hauteur;

// initial du labyrinthe
window.addEventListener("load", init);
function init() {

    createMaze();
    draw();
    return;

}

function draw() {

    let startAtRow = 0;
    let startAtCol = 0;

    addRoute(startAtRow, startAtCol);
    return;

}

//creation de la grid du labyrinthe
function createMaze() {

    let rowIndex, colIndex;
    let table = document.createElement("table");

    for (rowIndex = 0; rowIndex <= mazeHeight - 1; rowIndex++) {

        let row = document.createElement("tr");

        for (colIndex = 0; colIndex <= mazeWidth - 1; colIndex++) {

            let col = document.createElement("td");

            if (rowIndex == 0 && colIndex == 0) {

                col.style.backgroundColor = "blue";
                col.setAttribute("type", "start");

            } else if (rowIndex == mazeHeight - 1 && colIndex == mazeWidth - 1) {

                col.style.backgroundColor = "red";
                col.setAttribute("type", "finish");

            }

            col.setAttribute("id", "cell_" + rowIndex + "_" + colIndex);
            row.appendChild(col);

        }

        table.appendChild(row);
    }

    document.getElementById("labyrinthe").appendChild(table);
    return;
}

function addRoute(startAtRow, startAtCol) {

    let choices = ["right", "bottom", "left", "top"];

    /*let remainingExits = {
        "right": 1 + startAtRow + startAtCol * (mazeWidth + 1),
        "bottom": startAtRow + (startAtCol + 1) * mazeWidth,
        "left": startAtRow + startAtCol * (mazeWidth + 1),
        "top": startAtRow + startAtCol * mazeWidth
    };*/

    let lastCells = [];
    let rowIndex = startAtRow;
    let colIndex = startAtCol;
    let loop = 0;

    while (loop < ((mazeHeight * mazeWidth) - 1)) {

        let nextExits = []
        let currentCell = document.getElementById("cell_" + rowIndex + "_" + colIndex);
        let nextPossibleCell;

        // la possblilité de la cellules pour la suivants
        for (i = 0; i < choices.length; i++) {

            switch (choices[i]) {

                case "right":
                    nextPossibleCell = document.getElementById("cell_" + rowIndex + "_" + (colIndex + 1));
                    break;

                case "left":
                    nextPossibleCell = document.getElementById("cell_" + rowIndex + "_" + (colIndex - 1));
                    break;

                case "bottom":
                    nextPossibleCell = document.getElementById("cell_" + (rowIndex + 1) + "_" + colIndex);
                    break;

                case "top":
                    nextPossibleCell = document.getElementById("cell_" + (rowIndex - 1) + "_" + colIndex);
                    break;

            }

            if (nextPossibleCell != null) {

                if (nextPossibleCell.getAttribute("occupied") != "true") {

                    nextExits.push(choices[i]);
                }
            }

        }

        // possibilité du chemin vers la sortir
        if (nextExits.length == undefined || nextExits.length == 0) {

            lastCells.splice(lastCells.length - 1, 1);
            rowIndex = lastCells[lastCells.length - 1][0];
            colIndex = lastCells[lastCells.length - 1][1];
            continue;

        }

        // le choix de la cellule suivant
        let IndexRadom = Math.floor(Math.random() * Math.floor(nextExits.length));
        let exit = nextExits[IndexRadom];
        console.log(nextExits[IndexRadom])

        //cellule sortir pour les mur
        if (!(exit == "right" && colIndex == mazeWidth - 1 && rowIndex == mazeHeight) &&
            !(exit == "bottom" && colIndex == mazeWidth && rowIndex == mazeHeight - 1)) {

            currentCell.style["border-" + exit] = "none";

        }

        //nouvelle position de la cellule
        switch (exit) {

            case "right":
                colIndex = colIndex + 1;
                break;

            case "bottom":

                rowIndex = rowIndex + 1;
                break;

            case "left":

                colIndex = colIndex - 1;
                break;

            case "top":

                rowIndex = rowIndex - 1;
                break;

        }

        lastCells.push([rowIndex, colIndex]);

        currentCell = document.getElementById("cell_" + rowIndex + "_" + colIndex);

        // effacer les murs
        switch (exit) {

            case "right":

                currentCell.style["border-left"] = "none";
                break;

            case "bottom":

                currentCell.style["border-top"] = "none";
                break;

            case "left":

                currentCell.style["border-right"] = "none";
                break;

            case "top":

                currentCell.style["border-bottom"] = "none";
                break;

        }

        currentCell.setAttribute("occupied", "true");
        loop++;

    }
    return;
}