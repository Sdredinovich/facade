import { AuthFacade } from './../../../../common/data-access-common/src/lib/+state/auth/auth.facade';
import { TranslateModule } from '@ngx-translate/core';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  // FormControl,
  // FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { LocalStorageJwtService } from 'libs/common/data-access-common/src/lib/services/loacal-storage-jwt.services';
import { Router } from '@angular/router';

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
  authFacade = inject(AuthFacade);
  storage = inject(LocalStorageJwtService);
  router = inject(Router);
  private fb = inject(FormBuilder);

  form: FormGroup<{
    login: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    login: ['admin', Validators.required],
    password: ['admin', Validators.required],
  }, { nonNullable: true })

  login() {
    this.authFacade.logIn(
      this.form.value as {
        login: string;
        password: string;
      }
    );
  }

  ngOnInit() {
    if (this.storage.getItem()) {
      this.router.navigate(['/home']);
    }
  }
}
