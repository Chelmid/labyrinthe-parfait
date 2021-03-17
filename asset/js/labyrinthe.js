//recupérer dans url les parametre largeur et hauteur
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const hauteur = urlParams.get('hauteur')
const largeur = urlParams.get('largeur')

//control des dimension
function checkParams(hauteur, largeur) {

    if (hauteur > 100 || largeur > 100 && isNaN(hauteur) == true || isNaN(largeur) == true) {
        //enlever pour le test 
        //location.href = 'index.html'
        return true
    }

}

//taille du labyrinthe
let mazeWidth = largeur;
let mazeHeight = hauteur;

// initial du labyrinthe
window.addEventListener("load", init);
function init() {

    checkParams(hauteur, largeur);
    createMaze();
    constructionMaze();
    return;

}

//construction du labyrinthe
function constructionMaze() {

    let startRow = 0;
    let startCol = 0;

    wallsAndRoutes(startRow, startCol);
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

//generateur du labyrinthe
function wallsAndRoutes(startRow, startCol) {

    let directions = ["right", "bottom", "left", "top"];
    let lastCells = [];
    let rowIndex = startRow;
    let colIndex = startCol;
    let size = 0;

    while (size < ((mazeHeight * mazeWidth) - 1)) {

        let choicesDirection = []
        let nowCell = document.getElementById("cell_" + rowIndex + "_" + colIndex);
        let nextPossibleCell;

        // la possblilité de la cellules pour la suivants
        for (i = 0; i < directions.length; i++) {

            switch (directions[i]) {

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

                    choicesDirection.push(directions[i]);
                }
            }

        }

        // le choix de la cellule suivant
        let IndexRandom = Math.floor(Math.random() * Math.floor(choicesDirection.length));
        let goDirection = choicesDirection[IndexRandom];

        //cellule sortir pour les mur
        if (!(goDirection == "right" && colIndex == mazeWidth - 1 && rowIndex == mazeHeight) &&
            !(goDirection == "bottom" && colIndex == mazeWidth && rowIndex == mazeHeight - 1)) {

            nowCell.style["border-" + goDirection] = "none";

        }

        //nouvelle position de la cellule
        switch (goDirection) {

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

        //les derniers cellules visités
        if (choicesDirection.length == undefined || choicesDirection.length == 0 || choicesDirection != '') {

            lastCells.splice(lastCells.length - 1, 1);
            rowIndex = lastCells[lastCells.length - 1][0];
            colIndex = lastCells[lastCells.length - 1][1];
            continue;

        }

        nowCell = document.getElementById("cell_" + rowIndex + "_" + colIndex);

        // effacer les murs
        switch (goDirection) {

            case "right":

                nowCell.style["border-left"] = "none";
                break;

            case "bottom":

                nowCell.style["border-top"] = "none";
                break;

            case "left":

                nowCell.style["border-right"] = "none";
                break;

            case "top":

                nowCell.style["border-bottom"] = "none";
                break;

        }

        nowCell.setAttribute("occupied", "true");
        size++;

    }
    return;
}