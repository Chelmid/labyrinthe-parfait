//les test pour le fichier index

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