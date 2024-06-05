import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'facade-unauthorized-user-layout-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './unauthorized-user-layout-component.component.html',
  styleUrl: './unauthorized-user-layout-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnauthorizedUserLayoutComponentComponent {}
