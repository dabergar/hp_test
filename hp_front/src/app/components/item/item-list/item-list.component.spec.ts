import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ItemListComponent } from "./item-list.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "../../../app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatChipsModule } from "@angular/material/chips";
import { ApiService } from "src/app/services/api.service";
import { of } from "rxjs";

describe("ItemListComponent", () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;
  let apiService: any;
  let mockAlbums = [
    {
      userId: 1,
      id: 1,
      title: "quidem molestiae enim",
      thumbnailUrl: "https://via.placeholder.com/150/24f355"
    },
    {
      userId: 1,
      id: 2,
      title: "sunt qui excepturi placeat culpa",
      thumbnailUrl: "https://via.placeholder.com/150/24f355"
    },
    {
      userId: 2,
      id: 19,
      title: "velit pariatur quaerat similique libero omnis quia",
      thumbnailUrl: "https://via.placeholder.com/150/24f355"
    },
    {
      userId: 2,
      id: 20,
      title: "voluptas rerum iure ut enim",
      thumbnailUrl: "https://via.placeholder.com/150/24f355"
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatDialogModule,
        MatCardModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
        MatChipsModule
      ],
      declarations: [ItemListComponent],
      providers: [ApiService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call getAlbums onInit", () => {
    spyOn(apiService, "getData").and.returnValue(of(mockAlbums));
    component.ngOnInit();
    expect(apiService.getData).toHaveBeenCalled();
    expect(component.albums).toEqual(mockAlbums);
  });

  it("should filter albums by title on text input & be clearable", () => {
    component.data = mockAlbums;
    component.filterText = "quidem";
    component.filterAlbumsByName();
    expect(component.albums).toEqual([mockAlbums[0]]);

    component.clearFilterInput();
    expect(component.filterText).toEqual("");
    expect(component.albums.length).toEqual(4);
    expect(component.albums).toEqual(component.data);
  });

  it("should filter albums by artist id when artist seleted & be clearable", () => {
    component.albums = mockAlbums;
    component.data = mockAlbums;
    component.filterAlbumsByArtist(1);
    expect(component.albums.length).toEqual(2);
    expect(component.albums).toEqual([mockAlbums[0], mockAlbums[1]]);

    component.clearAlbumsByArtistFilter();
    expect(component.albums.length).toEqual(4);
    expect(component.albums).toEqual(mockAlbums);
  });

  it("should check filter albums by title works when artist selected", () => {
    component.albums = mockAlbums;
    component.data = mockAlbums;
    component.filterAlbumsByArtist(1);
    component.filterText = "enim";
    component.filterAlbumsByName();
    expect(component.albums.length).toEqual(1);
    expect(component.albums).toEqual([mockAlbums[0]]);
  });

  it("should check if artist filter works when albums title filter applied", () => {
    component.data = mockAlbums;
    component.filterText = "enim";
    component.filterAlbumsByName();
    component.filterAlbumsByArtist(2);
    expect(component.albums.length).toEqual(1);
    expect(component.albums).toEqual([mockAlbums[3]]);
  });
});
