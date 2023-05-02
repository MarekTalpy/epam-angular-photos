import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Photo } from 'src/app/shared/photo.model';
import { PhotosApiService } from 'src/app/shared/photos-api.service';

@Component({
  selector: 'app-all-photos',
  templateUrl: './all-photos.component.html',
})
export class AllPhotosComponent {
  photos$: Observable<Photo[]> | null;

  constructor(private readonly photosApiService: PhotosApiService) {}

  ngOnInit(): void {
    this.photos$ = this.photosApiService.fetchPhotos();
  }
}
