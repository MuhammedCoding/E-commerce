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

export const fadeInAnimation = animation([
  style({ opacity: 0 }),
  animate('{{time}} ease-in-out', style({ opacity: 1 })),
]);

export const fadeOutAnimation = animation([
  animate('1s ease-in-out', style({ opacity: 0 })),
]);

export const fadeRightAnimation = animation([
  style({ opacity: 0, transform: 'translateX(-30%)' }),
  animate('4s ease-in-out', style({ opacity: 1, transform: 'translateX(0)' })),
]);
export const staggeredFadeRightAnimation = animation([
  query(
    ':enter',
    [
      style({ opacity: 0, transform: 'translateX(-20px)' }),
      stagger('1s', [
        animate(
          '{{ time }} ease-in-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
    ],
    { optional: true }
  ),
]);
export const slideInAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ opacity: 0 }),
    animate('1s', style({ opacity: 1 })),
  ]),
]);

// export const fadeInRouteAnimation = trigger('routeAnimations');

/* FOR DIRECTIONS */
function slideTo(direction: string) {
  const optional = { optional: true };
  return [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          width: '100%',
        }),
      ],
      optional
    ),
    query(':enter', [style({ [direction]: '-100%' })]),
    group([
      query(
        ':leave',
        [animate('600ms ease', style({ [direction]: '100%' }))],
        optional
      ),
      query(':enter', [animate('600ms ease', style({ [direction]: '0%' }))]),
    ]),
  ];
}
