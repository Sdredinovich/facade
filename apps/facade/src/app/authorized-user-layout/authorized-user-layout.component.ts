import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFacade } from 'libs/common/data-access-common/src/lib/+state/auth/auth.facade';

@Component({
  selector: 'facade-authorized-user-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './authorized-user-layout.component.html',
  styleUrl: './authorized-user-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorizedUserLayoutComponent {
  authFacade = inject(AuthFacade)


goBack(){
  this.authFacade.logout()

}
}
