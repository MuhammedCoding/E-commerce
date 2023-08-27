import {
  animation,
  style,
  animate,
  query,
  stagger,
  group,
  transition,
  trigger,
} from '@angular/animations';

export const fadeInAnimation = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('2s ease-in-out', style({ opacity: 1 })),
  ]),
  transition(':leave', [animate('2s ease-in-out', style({ opacity: 0 }))]),
]);

export const fadeOutAnimation = trigger('fadeOut', [
  transition('* => void', [animate('1s ease-in-out', style({ opacity: 0 }))]),
]);

export const fadeRightAnimation = trigger('fadeRight', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-30%)' }),
    animate(
      '4s ease-in-out',
      style({ opacity: 1, transform: 'translateX(0)' })
    ),
  ]),
  transition(':leave', [
    animate(
      '4s ease-in-out',
      style({ opacity: 0, transform: 'translateX(30%)' })
    ),
  ]),
]);

export const fadeRoutingAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ opacity: 0 }),
    animate('1s', style({ opacity: 1 })),
  ]),
]);
