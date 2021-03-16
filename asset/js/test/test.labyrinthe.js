describe('checkParams', () => {

    it('should params return void and continue', () => {
        chai.expect(checkParams(10,10)).to.equal();
    });

    it('should params return false and redirect', () => {
        chai.expect(checkParams(101,101)).to.equal(true);
    });

    it('should params return false and redirect', () => {
        chai.expect(checkParams(10,'a')).to.equal(true);
    });
});