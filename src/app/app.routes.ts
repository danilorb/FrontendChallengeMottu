import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { FavoritesComponent } from './features/favorites/favorites.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'favorites',
    component: FavoritesComponent
  }
];
