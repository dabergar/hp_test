import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { AlbumService } from "./services/album.service";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const albumService = new AlbumService();

app.use(cors());

app.get("/albums", function (req, res) {
  albumService.getAlbums(req, res);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
