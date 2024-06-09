import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TuiBlockStatusModule} from '@taiga-ui/layout';
import { TuiButtonModule } from '@taiga-ui/core';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'facade-not-found',
  standalone: true,
  imports: [CommonModule, TuiBlockStatusModule, TuiButtonModule, TranslateModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
  constructor(private location: Location, private router: Router) {}

  goBack(): void {
    this.location.back();
  }

}
