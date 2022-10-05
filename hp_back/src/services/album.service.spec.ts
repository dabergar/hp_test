import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import { AlbumService } from "../../src/services/album.service";

let server = "http://localhost:8000";
let should = chai.should();
chai.use(chaiHttp);
let albumService: any;

describe("AlbumsService", () => {
  beforeEach((done) => {
    albumService = new AlbumService();
    done();
  });

  describe("getAlbums()", () => {
    it("it should GET the mock albums", async () => {
      const stubValue = [
        {
          userId: 1,
          id: 1,
          title: "quidem molestiae enim"
        },
        {
          userId: 1,
          id: 2,
          title: "sunt qui excepturi placeat culpa"
        },
        {
          userId: 1,
          id: 3,
          title: "quidem molestiae enim"
        }
      ];
      const stub = sinon.stub(albumService, "getAlbums").resolves(stubValue);

      const albums = await albumService.getAlbums().then((res: any) => {
        expect(stub.calledOnce).to.be.true;
        res.length.should.be.eql(3);
      });
    });
  });
});
