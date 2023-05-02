import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { PhotosApiService } from '../../shared/photos-api.service';
import { Photo } from 'src/app/shared/photo.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photos-detail',
  templateUrl: './photos-detail.component.html',
  styleUrls: ['./photos-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosDetailComponent {
  selectedPhoto$: Observable<Photo>;

  constructor(
    private readonly photosApiService: PhotosApiService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const imageId = this.route.snapshot.paramMap.get('id') as string;
    this.selectedPhoto$ = this.photosApiService.fetchPhotoDetail(imageId);
  }
}
