import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './modules/pages/components/secondary-components/not-found/not-found.component';


const routes: Routes = [
  { path: '', redirectTo: 'pages/home', pathMatch: 'full' },
  { path: 'pages', loadChildren : ()=> import('./modules/pages/pages.module').then((m)=>m.PagesModule) },
  { path: 'authentication', loadChildren : ()=> import('./modules/authentication/authentication.module').then((m)=>m.AuthenticationModule) },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64],
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
