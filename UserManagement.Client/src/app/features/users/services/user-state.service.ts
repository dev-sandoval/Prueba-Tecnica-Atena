import { Injectable, inject, signal, computed } from '@angular/core';
import { User } from '../models/user';
import { UserService } from './user.service';

export interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private userService = inject(UserService);

  private state = signal<UserState>({
    users: [],
    isLoading: false,
    error: null,
  });

  users = computed(() => this.state().users);
  isLoading = computed(() => this.state().isLoading);
  error = computed(() => this.state().error);

  /**
   * Carga lista de usuarios
   */
  loadUsers(): void {
    this.state.update((s) => ({ ...s, isLoading: true, error: null }));

    this.userService.getUsers().subscribe({
      next: (response) => {
        const usersWithLocalDates = response.data.map((user) => ({
          ...user,
          createdAt: this.parseUtcDate(user.createdAt),
        }));

        this.state.update((s) => ({
          ...s,
          users: usersWithLocalDates,
          isLoading: false,
        }));
      },
      error: (error) => {
        this.state.update((s) => ({
          ...s,
          isLoading: false,
          error: error.message || 'Error al cargar usuarios',
        }));
      },
    });
  }

  /**
   * Convierte timestamp UTC del backend a Date local
   * Backend envía: "2025-12-26T23:16:27.9728478" (sin Z, pero es UTC)
   */
  private parseUtcDate(dateValue: unknown): Date {
    if (!dateValue) return new Date();

    if (dateValue instanceof Date) return dateValue;

    // Si es string sin timezone, asumir UTC y agregar 'Z'
    const dateString = String(dateValue);
    const utcString = dateString.endsWith('Z') ? dateString : `${dateString}Z`;

    return new Date(utcString);
  }

  /**
   * Limpia errores
   */
  clearError(): void {
    this.state.update((s) => ({ ...s, error: null }));
  }

  /**
   * Limpia estado
   */
  resetState(): void {
    this.state.set({
      users: [],
      isLoading: false,
      error: null,
    });
  }
}
