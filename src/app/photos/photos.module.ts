import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { PhotosComponent } from './photos.component';
import { PhotosRoutingModule } from './photos-routing.module';

@NgModule({
  declarations: [PhotosComponent],
  imports: [RouterModule, SharedModule, PhotosRoutingModule],
})
export class PhotosModule {}
