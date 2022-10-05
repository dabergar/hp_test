import request from "request";

export class AlbumService {
  constructor() {}

  public getAlbums(req: any, res: any) {
    let uri = "https://jsonplaceholder.typicode.com/albums";
    if (req.query.userId) {
      uri += `?userId=${req.query.userId}`;
    }
    request(
      {
        uri
      },
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          const albums = JSON.parse(body);
          const titles = albums.map((o: any) => o.title);
          let filteredAlbums = albums.filter(({ title }: any, index: number) => !titles.includes(title, index + 1));
          filteredAlbums = filteredAlbums.map((o: any) => ({ ...o, thumbnailUrl: "https://via.placeholder.com/150/24f355" }));
          res.json(filteredAlbums);
        } else {
          res.json(error);
        }
      }
    );
  }
}

export default AlbumService;
