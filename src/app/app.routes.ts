import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadChildren: () => import('./feature/home/home.routes')
  },
  {
    path: 'comments',
    loadChildren: () => import('./feature/comments/comments.routes')
  },
  {
    // fallback route (can be used to display dedicated 404 lazy feature)
    path: '**',
    redirectTo: ''
  }
];
