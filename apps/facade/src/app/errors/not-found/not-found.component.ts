import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TuiBlockStatusModule} from '@taiga-ui/layout';
import { TuiButtonModule } from '@taiga-ui/core';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'facade-not-found',
  standalone: true,
  imports: [CommonModule, TuiBlockStatusModule, TuiButtonModule, TranslateModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}
