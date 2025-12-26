import { Routes } from '@angular/router';
import { UserListComponent } from './features/users/components/user-list/user-list.component';
import { UserFormComponent } from './features/users/components/user-form/user-form.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    children: [
      {
        path: '',
        component: UserListComponent,
        title: 'Lista de Usuarios',
      },
      {
        path: 'create',
        component: UserFormComponent,
        title: 'Crear Usuario',
      },
    ],
  },
];
