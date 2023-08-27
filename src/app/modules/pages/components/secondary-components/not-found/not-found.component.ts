import { trigger, transition, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import {
  fadeInAnimation,
  fadeOutAnimation, fadeRightAnimation,
  fadeRoutingAnimations,
} from '../../../../../animations/animations';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
  animations: [fadeInAnimation, fadeOutAnimation, fadeRightAnimation],
})
export class NotFoundComponent {}
