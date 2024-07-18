import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiSvgModule } from '@taiga-ui/core';

@Component({
  selector: 'facade-feature-home-page',
  standalone: true,
  imports: [CommonModule, TuiSvgModule],
  templateUrl: './feature-homePage.component.html',
  styleUrl: './feature-homePage.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class FeatureHomePageComponent {}
