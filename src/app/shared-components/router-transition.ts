import { trigger, animate, style, group, query, transition } from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [
    query(':enter, :leave', style({ position: 'fixed', width: '800px' }), { optional: true }),
    group([
      query(':enter', [
        style({ transform: 'translateX(200%)' }),
        animate('0.65s ease-in-out', style({ transform: 'translateX(0%)' }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('0.65s ease-in-out', style({ transform: 'translateX(-200%)' }))
      ], { optional: true }),
    ])
  ])
]);
