import {
    transition,
    trigger,
    query,
    style,
    animate,
    group,
    animateChild
 } from '@angular/animations';
 export const slideInAnimation =
    trigger('routeAnimations', [
         transition('Home => *', [
              query(':enter, :leave', 
                   style({ position: 'fixed',  width: '100%' }), 
                   { optional: true }),
              group([
                   query(':enter', [
                       style({ transform: 'translateX(100%)' }), 
                       animate('0.5s ease-in-out', 
                       style({ transform: 'translateX(0%)' }))
                   ], { optional: true }),
                   query(':leave', [
                       style({ transform: 'translateX(0%)' }),
                       animate('0.5s ease-in-out', 
                       style({ transform: 'translateX(-100%)' }))
                       ], { optional: true }),
               ])
         ]),
         transition('Login => Home', [
            query(':enter, :leave', 
                 style({ position: 'fixed',  width: '100%' }), 
                 { optional: true }),
            group([
                 query(':enter', [
                     style({ transform: 'translateX(100%)' }), 
                     animate('0.5s ease-in-out', 
                     style({ transform: 'translateX(0%)' }))
                 ], { optional: true }),
                 query(':leave', [
                     style({ transform: 'translateX(0%)' }),
                     animate('0.5s ease-in-out', 
                     style({ transform: 'translateX(-100%)' }))
                     ], { optional: true }),
             ])
       ]),
         transition('Subpage => Home', [
               query(':enter, :leave', 
                   style({ position: 'fixed', width: '100%' }), 
                   { optional: true }),
               group([
                   query(':enter', [
                       style({ transform: 'translateX(-100%)' }),
                       animate('0.5s ease-in-out', 
                       style({ transform: 'translateX(0%)' }))
                   ], { optional: true }),
                   query(':leave', [
                    style({ transform: 'translateX(0%)' }),
                    animate('0.5s ease-in-out', 
                    style({ transform: 'translateX(100%)' }))
                    ], { optional: true }),
               ])
        ]),
        transition('ForgotPasword => Login', [
            query(':enter, :leave', 
                style({ position: 'fixed', width: '100%' }), 
                { optional: true }),
            group([
                query(':enter', [
                    style({ transform: 'translateX(-100%)' }),
                    animate('0.5s ease-in-out', 
                    style({ transform: 'translateX(0%)' }))
                ], { optional: true }),
                query(':leave', [
                 style({ transform: 'translateX(0%)' }),
                 animate('0.5s ease-in-out', 
                 style({ transform: 'translateX(100%)' }))
                 ], { optional: true }),
            ])
     ]),
        transition('Subpage =>  Subpage-add-memory', [
            query(':enter, :leave', 
                 style({ position: 'fixed',  width: '100%' }), 
                 { optional: true }),
            group([
                 query(':enter', [
                     style({ transform: 'translateX(100%)' }), 
                     animate('0.5s ease-in-out', 
                     style({ transform: 'translateX(0%)' }))
                 ], { optional: true }),
                 query(':leave', [
                     style({ transform: 'translateX(0%)' }),
                     animate('0.5s ease-in-out', 
                     style({ transform: 'translateX(-100%)' }))
                     ], { optional: true }),
             ])
       ]),
       transition('Subpage-add-memory => *', [
             query(':enter, :leave', 
                 style({ position: 'fixed', width: '100%' }), 
                 { optional: true }),
             group([
                 query(':enter', [
                     style({ transform: 'translateX(-100%)' }),
                     animate('0.5s ease-in-out', 
                     style({ transform: 'translateX(0%)' }))
                 ], { optional: true }),
                 query(':leave', [
                  style({ transform: 'translateX(0%)' }),
                  animate('0.5s ease-in-out', 
                  style({ transform: 'translateX(100%)' }))
                  ], { optional: true }),
             ])
      ])
 ]);
