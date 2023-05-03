import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, repeat, takeUntil } from 'rxjs';

import { Photo } from 'src/app/shared/models/photo.model';
import { PhotosApiService } from 'src/app/shared/services/photos-api.service';

@Component({
  selector: 'app-all-photos',
  templateUrl: './all-photos.component.html',
  styleUrls: ['./all-photos.component.scss'],
})
export class AllPhotosComponent implements OnInit, OnDestroy {
  isLoading = false;
  isError = false;
  allLoadedPhotos: Photo[] = [];
  bottomPageReached$ = new Subject<void>();
  destroy$ = new Subject<void>();

  constructor(
    private readonly photosApiService: PhotosApiService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.photosApiService
      .fetchPhotos()
      .pipe(
        repeat({ delay: () => this.bottomPageReached$ }),
        takeUntil(this.destroy$)
      )
      .subscribe((photos) => {
        if (photos === null) {
          this.isError = true;
          this.isLoading = false;
        } else {
          this.allLoadedPhotos = [...this.allLoadedPhotos, ...photos];
          this.isLoading = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handlePhotoClicked(photo: Photo): void {
    this.router.navigateByUrl(`/photos/${photo.id}`);
  }

  handleScroll(): void {
    this.isLoading = true;
    this.bottomPageReached$.next();
  }
}
