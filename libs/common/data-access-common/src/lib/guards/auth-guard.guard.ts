import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageJwtService } from '../services/loacal-storage-jwt.service';

export const authGuard = () => {
  const router = inject(Router);
  const storage = inject(LocalStorageJwtService);

  if (!storage.getItem()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
