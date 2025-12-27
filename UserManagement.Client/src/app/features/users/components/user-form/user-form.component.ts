import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-user-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userServiceService = inject(UserService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  userForm!: FormGroup;
  isLoading = false;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.minLength(9)]],
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.notificationService.warning(
        'Por favor, complete el formulario correctamente'
      );
      return;
    }

    this.isLoading = true;
    const formValue = this.userForm.value;

    this.userServiceService.createUser(formValue).subscribe({
      next: (response) => {
        this.notificationService.success('Usuario creado exitosamente');
        this.isLoading = false;
        this.router.navigate(['/users']);
      },
      error: (error) => {
        this.notificationService.error(
          error.error?.message || 'Error al crear el usuario'
        );
        this.isLoading = false;
      },
    });
  }

  resetForm(): void {
    this.userForm.reset();
  }
}
