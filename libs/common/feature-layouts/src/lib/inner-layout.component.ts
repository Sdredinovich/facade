import {
  TuiThemeNightService
} from '@taiga-ui/addon-doc/services'

import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiHostedDropdownModule,
} from '@taiga-ui/core';
import { AuthFacade } from '@facade/common/data-access-common';
import {
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';

import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./components/nav.component";

@Component({
  selector: 'facade-inner-layout',
  standalone: true,
  imports: [
    CommonModule,
    TuiButtonModule,
    TuiHostedDropdownModule,
    TuiDataListModule,
    TranslateModule,
    RouterOutlet,
    NavComponent
],
  templateUrl: './inner-layout.component.html',
  styleUrl: './inner-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InnerLayoutComponent {
  translate = inject(TranslateService);
  authFacade = inject(AuthFacade);
  night$ = inject(TuiThemeNightService);
  langOpened = false;

  logout() {
    this.authFacade.logout();
  }

  useLang(lang: string ) {
    this.translate.use(lang);
  }

}
