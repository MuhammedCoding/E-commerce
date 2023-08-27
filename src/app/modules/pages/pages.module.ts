import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { NavbarComponent } from './components/main-components/navbar/navbar.component';
import { FooterComponent } from './components/main-components/footer/footer.component';

@NgModule({
  declarations: [PagesComponent, NavbarComponent, FooterComponent],
  imports: [CommonModule, PagesRoutingModule],
})
export class PagesModule {}
