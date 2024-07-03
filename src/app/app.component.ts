import { Component } from '@angular/core';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

@Component({
  selector: 'lmbl-root',
  standalone: true,
  imports: [MainLayoutComponent],
  template: '<lmbl-main-layout />'
})
export class AppComponent {}
