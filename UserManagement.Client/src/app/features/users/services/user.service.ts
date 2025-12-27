import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { CreateUserDto } from '../models/create-user-dto';
import { ApiResponse } from '@core/models/api-response';
import { environment } from '@/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/users`;

  /**
   * Obtiene lista de usuarios
   * GET /api/Users
   */
  getUsers(): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(this.apiUrl);
  }

  /**
   * Crea un nuevo usuario
   * POST /api/Users
   */
  createUser(createUserDto: CreateUserDto): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(this.apiUrl, createUserDto);
  }
}
