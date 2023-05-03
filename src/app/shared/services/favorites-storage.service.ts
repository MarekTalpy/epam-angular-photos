import { Injectable } from '@angular/core';

import { LocalStorageKeys, LocalStorageService } from './local-storage.service';
import { Photo } from '../models/photo.model';

@Injectable({
  providedIn: 'root',
})
export class FavoritesStorageService {
  constructor(private readonly LS: LocalStorageService) {}

  toggleFavorites(photo: Photo): void {
    const favorites = this.LS.getData<Photo[]>(LocalStorageKeys.FAVORITES);
    if (favorites) {
      if (this.isInFavorites(photo.id)) {
        const photosToSave = favorites.filter(
          (favoritePhoto) => favoritePhoto.id !== photo.id
        );
        this.LS.saveData(LocalStorageKeys.FAVORITES, photosToSave);
      } else {
        this.LS.saveData(LocalStorageKeys.FAVORITES, [...favorites, photo]);
      }
    } else {
      this.LS.saveData(LocalStorageKeys.FAVORITES, [photo]);
    }
  }

  isInFavorites(photoId: string): boolean {
    const favorites = this.LS.getData<Photo[]>(LocalStorageKeys.FAVORITES);
    if (favorites) {
      return favorites.some((favoritePhoto) => favoritePhoto.id === photoId);
    } else {
      return false;
    }
  }
}
