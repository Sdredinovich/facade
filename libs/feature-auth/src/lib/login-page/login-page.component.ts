import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
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

  form: FormGroup<{
    login: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group(
    {
      login: ['admin', Validators.required],
      password: ['admin', Validators.required],
    },
    { nonNullable: true }
  );

  ngOnInit() {
    if (this.storage.getItem()) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    this.authFacade.logIn(
      this.form.value as {
        login: string;
        password: string;
      },
      this.loginError
    );
  }

  loginError = () => {
    this.alertService
      .open('Неверный пароль или логин', {
        status: 'error',
      })
      .subscribe();
  };
}
