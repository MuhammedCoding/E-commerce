import { Component } from '@angular/core';

@Component({
  selector: 'app-pages',
  template: `
    <div class="wrapper">
      <app-navbar ></app-navbar>
      <div class="container py-5 main">
        <router-outlet></router-outlet>
      </div>
      <app-footer></app-footer>
    </div>
  `,
})
export class PagesComponent {}
