function checkParams(hauteur,largeur){

    let h = parseInt(hauteur, 10);
    let l = parseInt(largeur, 10);


    if(h > 100 || l > 100 || isNaN(h) === true || isNaN(l) === true){
        location.href = 'index.html'
        return false;
    }
}

describe('checkParams', () => {
    it('should params return true', () => {
        chai.expect(checkParams(101,101)).to.equal(false);
    });

    it('should params return true', () => {
        chai.expect(checkParams(10,'a')).to.equal(false);
    });
});