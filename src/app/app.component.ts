import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation],
})
export class AppComponent {
  title = 'e-commerce';

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }

  showNav: boolean = true;
  showContainer: boolean = true;
  showFooter: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const routeUrl = event.url;
        this.showNav = !(
          routeUrl === '/register' ||
          routeUrl === '/login' ||
          routeUrl === '/forget-password'
        );
        this.showContainer = !(
          routeUrl === '/register' || routeUrl === '/login'
        );
        this.showFooter = !(
          routeUrl === '/register' ||
          routeUrl === '/login' ||
          routeUrl === '/forget-password'
        );
      }
    });
  }
}
