import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotosGridComponent } from './photos-grid/photos-grid.component';
import { ResizeImagePipe } from './pipes/resize-image.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [PhotosGridComponent, ResizeImagePipe],
  exports: [CommonModule, PhotosGridComponent, ResizeImagePipe],
})
export class SharedModule {}
