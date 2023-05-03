import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Photo } from 'src/app/shared/models/photo.model';
import { PhotosApiService } from 'src/app/shared/services/photos-api.service';

@Component({
  selector: 'app-all-photos',
  templateUrl: './all-photos.component.html',
  styleUrls: ['./all-photos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllPhotosComponent {
  photos$: Observable<Photo[] | null>;

  constructor(
    private readonly photosApiService: PhotosApiService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.photos$ = this.photosApiService.fetchPhotos();
  }

  handlePhotoClicked(photo: Photo): void {
    this.router.navigateByUrl(`/photos/${photo.id}`);
  }
}
