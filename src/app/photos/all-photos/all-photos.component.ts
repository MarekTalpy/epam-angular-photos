import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, repeat, repeatWhen } from 'rxjs';

import { Photo } from 'src/app/shared/models/photo.model';
import { PhotosApiService } from 'src/app/shared/services/photos-api.service';

@Component({
  selector: 'app-all-photos',
  templateUrl: './all-photos.component.html',
  styleUrls: ['./all-photos.component.scss'],
})
export class AllPhotosComponent {
  isLoading = false;
  isError = false;
  allLoadedPhotos: Photo[] = [];
  bottomPageReached$ = new Subject<void>();

  constructor(
    private readonly photosApiService: PhotosApiService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.photosApiService
      .fetchPhotos()
      .pipe(repeat({ delay: () => this.bottomPageReached$ }))
      .subscribe((photos) => {
        if (photos === null) {
          this.isError = true;
        } else {
          this.allLoadedPhotos = [...this.allLoadedPhotos, ...photos];
          this.isLoading = false;
        }
      });
  }

  handlePhotoClicked(photo: Photo): void {
    this.router.navigateByUrl(`/photos/${photo.id}`);
  }

  handleScroll(): void {
    this.photosApiService.fetchPhotos();
    console.log('bottom reached');
    this.isLoading = true;
    this.bottomPageReached$.next();
  }
}
