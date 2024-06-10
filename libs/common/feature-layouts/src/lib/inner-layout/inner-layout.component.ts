import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
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
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'facade-inner-layout',
  standalone: true,
  imports: [
    CommonModule,
    TuiButtonModule,
    TuiHostedDropdownModule,
    TuiDataListModule,
    TranslateModule,
    RouterOutlet
  ],
  templateUrl: './inner-layout.component.html',
  styleUrl: './inner-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InnerLayoutComponent implements OnDestroy, OnInit {
  translate = inject(TranslateService);
  authFacade = inject(AuthFacade);
  cdr = inject(ChangeDetectorRef);

  langOpened = false;

  currentLang = '';

  destroy$ = new Subject<void>();

  ngOnInit() {
    this.currentLang = this.translate.currentLang || this.translate.defaultLang;
    this.translate.onLangChange.pipe(takeUntil(this.destroy$)).subscribe((event: LangChangeEvent) => {
      this.currentLang = event.lang;
    });
  }

  logout() {
    this.authFacade.logout();
  }

  ru() {
    this.translate.use('ru');
  }
  en() {
    this.translate.use('en');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
