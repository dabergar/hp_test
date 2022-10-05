import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ApiService } from "src/app/services/api.service";
import { ArtistNames } from "src/app/enums/artists.enum";
import { Subscription } from "rxjs";

@Component({
  selector: "app-item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.scss"]
})
export class ItemListComponent implements OnInit {
  public data: any;
  public albums: any;
  public filterText = "";
  public selectedArtistId?: number;
  public artistNames = ArtistNames;
  private getDataSub?: Subscription;

  constructor(private apiService: ApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAlbums();
  }

  displayedColumns: string[] = ["id", "title", "userId", "thumbnailUrl"];

  filterAlbumsByName() {
    this.albums = this.data.filter((item: any) => {
      return item.title.includes(this.filterText) && (item.userId == this.selectedArtistId || !this.selectedArtistId);
    });
  }

  filterAlbumsByArtist(id?: number) {
    this.selectedArtistId = id;
    if (id) {
      this.albums = this.albums.filter((item: any) => {
        return item.userId == id;
      });
    } else {
      this.filterAlbumsByName();
    }
  }

  clearFilterInput() {
    this.filterText = "";
    this.filterAlbumsByName();
  }

  clearAlbumsByArtistFilter() {
    this.filterAlbumsByArtist();
  }

  getAlbums(id?: number) {
    this.getDataSub = this.apiService.getData(id).subscribe((data) => {
      this.data = data;
      this.albums = [...this.data];
      if (this.getDataSub) {
        this.getDataSub.unsubscribe();
      }
    });
  }
}
