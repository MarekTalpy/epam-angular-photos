import { NgModule } from '@angular/core';

import { HeaderComponent } from './components/header.component';
import { MaterialModule } from '../material/material.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [MaterialModule, CommonModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class CoreModule {}
