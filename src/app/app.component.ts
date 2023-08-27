import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { fadeRoutingAnimations } from './animations/animations';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeRoutingAnimations],
})
export class AppComponent {
  title = 'e-commerce';
  private routerEventsSubscription: Subscription | undefined;

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
    this.routerEventsSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const routeUrl = event.url;
        this.showNav = !(routeUrl === '/register' || routeUrl === '/login');
        this.showContainer = !(
          routeUrl === '/register' || routeUrl === '/login'
        );
        this.showFooter = !(routeUrl === '/register' || routeUrl === '/login');
      }
    });
  }
  ngOnDestroy(): void {
    if (this.routerEventsSubscription) {
      this.routerEventsSubscription.unsubscribe();
    }
  }
}
