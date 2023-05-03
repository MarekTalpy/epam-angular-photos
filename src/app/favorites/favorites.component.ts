import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Photo } from '../shared/photo.model';
import {
  LocalStorageKeys,
  LocalStorageService,
} from '../shared/local-storage.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent implements OnInit {
  favoritePhotos: Photo[] | null = [];

  constructor(
    private readonly router: Router,
    private readonly LS: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.favoritePhotos = this.LS.getData(LocalStorageKeys.FAVORITES);
  }

  handlePhotoClicked(photo: Photo): void {
    this.router.navigateByUrl(`/photos/${photo.id}`);
  }
}
