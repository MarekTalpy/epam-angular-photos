import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotosGridComponent } from './photos-grid/photos-grid.component';
import { ResizeImagePipe } from './pipes/resize-image.pipe';
import { MaterialModule } from '../material/material.module';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [PhotosGridComponent, ResizeImagePipe, InfiniteScrollComponent],
  exports: [
    CommonModule,
    PhotosGridComponent,
    ResizeImagePipe,
    MaterialModule,
    InfiniteScrollComponent,
  ],
})
export class SharedModule {}
