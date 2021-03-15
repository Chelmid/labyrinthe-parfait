function validateForm() {

  if (isNaN(hauteur.value) === true) {
    messageError.innerHTML = "la hauteur ou la largeur n'est pas un nombre"
    return false;
  }
  if (isNaN(largeur.value) === true) {
    messageError.innerHTML = "la largeur ou la hauteur n'est pas un nombre"
    return false;
  }
  if ((hauteur.value === '' || hauteur.value === '0' || hauteur.value > 100)) {
    messageError.innerHTML = "la hauteur ou la largeur doit être en 1 à 100"
    return false;
  }
  if ((largeur.value === '' || largeur.value === '0' || largeur.value > 100)) {
    messageError.innerHTML = "la hauteur ou la largeur doit être en 1 à 100"
    return false;
  }

}

describe('errorForm', () => {
  it('should from content error return false', () => {
    chai.expect(validateForm()).to.equal(false);
  });
});

describe('validForm', () => {
  it('should form valid return void',  () => {
    chai.expect(validateForm()).to.equal();
  });
});