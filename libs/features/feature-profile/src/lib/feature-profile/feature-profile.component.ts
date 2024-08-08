import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureProfileFacade } from '@facade/data-access';
import { AuthFacade } from '@facade/common/data-access-common';
import { filter } from 'rxjs';

@Component({
  selector: 'facade-feature-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-profile.component.html',
  styleUrl: './feature-profile.component.scss',
})
export class FeatureProfileComponent {
  featureFacade = inject(FeatureProfileFacade);
  authFacade = inject(AuthFacade);
  userId!: number;

  ngOnInit() {
    this.authFacade.loggedUser$.subscribe((user) => {
      if (user) {
        this.userId = user.id;
      }
    });
    this.getProfile();
  }

  getProfile(id?: number) {
    this.featureFacade.getProfile(id || this.userId);
  }
}
