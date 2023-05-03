import { FavoritesStorageService } from './../../shared/favorites-storage.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { PhotosApiService } from '../../shared/photos-api.service';
import { Photo } from 'src/app/shared/photo.model';
import { ActivatedRoute } from '@angular/router';

type FavoritesButtonLabel = 'Add to Favorites' | 'Remove from Favorites';

@Component({
  selector: 'app-photos-detail',
  templateUrl: './photos-detail.component.html',
  styleUrls: ['./photos-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosDetailComponent {
  selectedPhoto$: Observable<Photo>;
  isInFavorites: boolean;

  constructor(
    private readonly photosApiService: PhotosApiService,
    private readonly route: ActivatedRoute,
    private readonly favoritesStorageService: FavoritesStorageService
  ) {}

  ngOnInit(): void {
    const imageId = this.route.snapshot.paramMap.get('id') as string;
    this.selectedPhoto$ = this.photosApiService.fetchPhotoDetail(imageId);
  }

  getButtonLabel(photoId: string): FavoritesButtonLabel {
    const inFavorites = this.favoritesStorageService.isInFavorites(photoId);
    return inFavorites ? 'Remove from Favorites' : 'Add to Favorites';
  }

  toggleFavorites(photo: Photo): void {
    this.favoritesStorageService.toggleFavorites(photo);
  }
}
