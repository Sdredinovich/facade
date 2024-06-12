import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import {
  TuiAlertService,
  TuiButtonModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';

import {
  AuthFacade,
  LocalStorageJwtService,
} from '@facade/common/data-access-common';

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
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
  private authFacade = inject(AuthFacade);
  private storage = inject(LocalStorageJwtService);
  private alertService = inject(TuiAlertService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  form = this.fb.group(
    {
      login: ['admin', Validators.required],
      password: ['admin', Validators.required],
    },
    { nonNullable: true }
  );

  ngOnInit() {
    if (this.storage.getItem()) {
      this.router.navigate(['/dashboard/homePage']);
    }
  }

  login() {
    this.authFacade.logIn(this.form.value, this.loginError);
  }

  loginError = () => {
    this.alertService
      .open('Неверный логин или пароль', {
        status: 'error',
      })
      .subscribe();
  };
}
