import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import {
  TuiCheckboxLabeledModule,
  TuiInputModule,
  TuiInputPasswordModule,
} from '@taiga-ui/kit';
import {
  TuiAlertService,
  TuiButtonModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';

import { AuthFacade, AuthPayload } from '@facade/common/data-access-common';

@Component({
  selector: 'facade-login-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputPasswordModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
    TranslateModule,
    TuiCheckboxLabeledModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
  authFacade = inject(AuthFacade);
  private alertService = inject(TuiAlertService);
  private router = inject(Router);
  private fb = inject(NonNullableFormBuilder);

  form = this.fb.group<AuthPayload>({
    email: 'sedredinovich@gmail.com',
    password: 'saashdSa12_',
    rememberMe: false,
    captcha: null,
  });

  ngOnInit() {
    this.authFacade.loggedUser$.subscribe((user) => {
      if (user) {
        this.router.navigate(['/dashboard/homePage']);
      }
    });
  }

  login() {
    this.authFacade.logIn(this.form.value as AuthPayload, this.loginError);
  }

  loginError = (text: string) => {
    this.alertService
      .open(text, {
        status: 'error',
      })
      .subscribe();
  };
}
