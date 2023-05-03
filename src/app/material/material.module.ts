import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatProgressSpinnerModule],
  exports: [MatButtonModule, MatToolbarModule, MatProgressSpinnerModule],
})
export class MaterialModule {}
