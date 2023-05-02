import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Photo } from '../photo.model';

@Component({
  selector: 'app-photos-grid',
  templateUrl: './photos-grid.component.html',
  styleUrls: ['./photos-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosGridComponent {
  @Input() photos: Photo[] | null = [];
  @Output() photoClick = new EventEmitter<Photo>();

  handlePhotoClick(photo: Photo): void {
    this.photoClick.emit(photo);
  }
}
