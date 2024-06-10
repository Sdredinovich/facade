import { AuthFacade } from './../../../../common/data-access-common/src/lib/+state/auth/auth.facade';
import { TranslateModule } from '@ngx-translate/core';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  // FormControl,
  // FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiTextfieldControllerModule } from '@taiga-ui/core';

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
    // TuiTextfield
    TuiButtonModule,
    TranslateModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  authFacade = inject(AuthFacade);

  private fb = inject(FormBuilder);
  form = this.fb.group({
    login: ['admin', Validators.required],
    password: ['admin', Validators.required],
  });

  constructor() {
    // this.form = this.fb.group({
    //   login: ['admin', Validators.required],
    //   password: ['admin', Validators.required],
    // });
  }

  login() {
    console.log(this.form.value);
    this.authFacade.logIn(this.form.value as {
      login: string;
      password: string;
  } );
  }
}
