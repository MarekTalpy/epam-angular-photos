import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { PhotosComponent } from './photos.component';
import { PhotosRoutingModule } from './photos-routing.module';
import { AllPhotosComponent } from './all-photos/all-photos.component';
import { PhotosDetailComponent } from './photos-detail/photos-detail.component';

@NgModule({
  imports: [RouterModule, SharedModule, PhotosRoutingModule],
  declarations: [PhotosComponent, AllPhotosComponent, PhotosDetailComponent],
})
export class PhotosModule {}
