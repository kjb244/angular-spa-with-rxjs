import {animate, state, style, transition, trigger} from "@angular/animations";

export const animations = trigger('slideInOut', [
  state('in', style({
    'max-height': '100px',
    height: '100px',
    opacity: '1'
  })),
  state('out', style({
    'max-height': '0',
    overflow: 'hidden',
    opacity: '0'
  })),
  transition('in => out', animate('400ms 200ms')),
  transition('out => in', animate('400ms 200ms'))
]);
