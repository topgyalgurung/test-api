process.env.NODE_ENV = "test";

const chai = require("chai");
const expect = chai.expect;

const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../server");

chai.use(chaiHttp);

// clean up database
before((done) => {
  Product.deleteMany({}, function (err) {});
  done();
});

after((done) => {
  Product.deleteMany({}, function (err) {});
  done();
});
describe("/First test collection", () => {
  it("test default API welcome route ... ", (done) => {
    chai
      .request(server)
      .get("/api/welcome")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object"); // or "array"
        console.log(res.body.message);
        const actualVal = res.body.message;
        expect(actualVal).to.be.equal("Welcome to the MEN-REST-API");
        done();
      });
  });

  // database test
  it("should verify that we have 0 products in the db", (done) => {
    chai
      .request(server)
      .get("/api/products")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.be.eql(0);
      });
  });
  it("should test two values ... ", () => {
    let expectedVal = 10;
    let actualVal = 10;

    expect(actualVal).to.be.equal(expectedVal);
  });
});
