import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { PhotosComponent } from './photos.component';
import { PhotosRoutingModule } from './photos-routing.module';
import { AllPhotosComponent } from './all-photos/all-photos.component';

@NgModule({
  declarations: [PhotosComponent, AllPhotosComponent],
  imports: [RouterModule, SharedModule, PhotosRoutingModule],
})
export class PhotosModule {}
