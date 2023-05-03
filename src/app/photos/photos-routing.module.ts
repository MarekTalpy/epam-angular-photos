import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllPhotosComponent } from './all-photos/all-photos.component';
import { PhotosComponent } from './photos.component';
import { PhotosDetailComponent } from './photos-detail/photos-detail.component';

const routes: Routes = [
  {
    path: '',
    component: PhotosComponent,
    children: [
      { path: '', component: AllPhotosComponent },
      {
        path: 'photos/:id',
        component: PhotosDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotosRoutingModule {}
