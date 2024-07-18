import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TUI_SANITIZER,
  TuiThemeNightModule,
} from '@taiga-ui/core';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TuiThemeNightService } from '@taiga-ui/addon-doc/services';
import { CommonModule } from '@angular/common';
import { AuthFacade } from '@facade/common/data-access-common';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TranslateModule,
    TuiThemeNightModule,
    CommonModule,
  ],
  selector: 'facade-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  translate = inject(TranslateService);
  night$ = inject(TuiThemeNightService);
  authFacade = inject(AuthFacade);

  ngOnInit() {
    this.authFacade.auth();
    this.translate.use('ru');
  }
}
