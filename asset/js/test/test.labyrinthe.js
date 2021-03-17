//les test pour le fichier labyrinthe

describe('checkParams', () => {

    it('should params return void and continue', () => {
        chai.expect(checkParams(10,10)).to.equal();
    });

    it('should params return false and redirect param < 100', () => {
        chai.expect(checkParams(101,101)).to.equal(true);
    });

    it('should params return false and redirect params string', () => {
        chai.expect(checkParams(10,'a')).to.equal(true);
    });
});

describe('Labyrinthe', () => {

    it('should params return false and redirect', (done) => {
        chai.expect(wallsAndRoutes(1,1)).to.equal();
        done();
        //chai.expect(createMaze()).to.equal();
        //chai.expect(constructionMaze()).to.equal();
    });
});