import { Component } from '@angular/core';
import { take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { Photo } from 'src/app/shared/models/photo.model';
import { PhotosApiService } from 'src/app/shared/services/photos-api.service';
import { FavoritesStorageService } from 'src/app/shared/services/favorites-storage.service';

type FavoritesButtonLabel = 'Add to Favorites' | 'Remove from Favorites';

@Component({
  selector: 'app-photos-detail',
  templateUrl: './photos-detail.component.html',
  styleUrls: ['./photos-detail.component.scss'],
})
export class PhotosDetailComponent {
  selectedPhoto: Photo | null = null;
  isInFavorites: boolean;
  isLoading = false;
  isError = false;

  constructor(
    private readonly photosApiService: PhotosApiService,
    private readonly route: ActivatedRoute,
    private readonly favoritesStorageService: FavoritesStorageService
  ) {}

  ngOnInit(): void {
    const photoId = this.route.snapshot.paramMap.get('id') as string;
    this.isLoading = true;
    this.photosApiService
      .fetchPhotoDetail(photoId)
      .pipe(take(1))
      .subscribe((photo) => {
        if (photo === null) {
          this.isError = true;
          this.isLoading = false;
        } else {
          this.selectedPhoto = { ...photo };
          this.isLoading = false;
        }
      });
  }

  getButtonLabel(photoId: string): FavoritesButtonLabel {
    const inFavorites = this.favoritesStorageService.isInFavorites(photoId);
    return inFavorites ? 'Remove from Favorites' : 'Add to Favorites';
  }

  toggleFavorites(photo: Photo): void {
    this.favoritesStorageService.toggleFavorites(photo);
  }
}
