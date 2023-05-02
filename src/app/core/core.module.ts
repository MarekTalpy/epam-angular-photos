import { NgModule } from '@angular/core';

import { HeaderComponent } from './components/header.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [MaterialModule, SharedModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class CoreModule {}
