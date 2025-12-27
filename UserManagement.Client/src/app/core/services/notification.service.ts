import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private snackBar = inject(MatSnackBar);
  private readonly DURATION = 5000;

  success(message: string, duration?: number): void {
    this.snackBar.open(message, 'Close', {
      duration: duration || this.DURATION,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-success'],
    });
  }

  error(message: string, duration?: number): void {
    this.snackBar.open(message, 'Close', {
      duration: duration || this.DURATION,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-error'],
    });
  }

  warning(message: string, duration?: number): void {
    this.snackBar.open(message, 'Close', {
      duration: duration || this.DURATION,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-warning'],
    });
  }

  info(message: string, duration?: number): void {
    this.snackBar.open(message, 'Close', {
      duration: duration || this.DURATION,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-info'],
    });
  }
}
