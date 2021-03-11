//champs hauteur et largeur
let hauteur = document.getElementById('hauteur');
let largeur = document.getElementById('largeur');

//verification des champs si ils sont des interger
function validateForm() {

    if (isNaN(hauteur.value) === true) {
        return false;
    }
    if (isNaN(largeur.value) === true) {
        return false;
    }
    if ((hauteur.value == '' || hauteur.value === '0')) {
        return false;
    }
    if ((largeur.value == '' || largeur.value === '0')) {
        return false;
    }
}