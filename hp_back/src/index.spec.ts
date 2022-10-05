import chai from "chai";
import chaiHttp from "chai-http";

let server = "http://localhost:8000";
let should = chai.should();
chai.use(chaiHttp);

describe("Albums", () => {
  describe("/GET Albums", () => {
    it("it should GET all the albums", (done) => {
      chai
        .request(server)
        .get("/albums?userId=1")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(10);
          done();
        });
    });
  });
});
