import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotosGridComponent } from './photos-grid/photos-grid.component';
import { ResizeImagePipe } from './pipes/resize-image.pipe';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [PhotosGridComponent, ResizeImagePipe],
  exports: [CommonModule, PhotosGridComponent, ResizeImagePipe, MaterialModule],
})
export class SharedModule {}
