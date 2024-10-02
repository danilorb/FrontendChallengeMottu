import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favorites: any[] = [];

  addFavorite(character: any): void {
    this.favorites.push(character);
  }

  removeFavorite(character: any): void {
    this.favorites = this.favorites.filter(fav => fav.id !== character.id);
  }

  isFavorite(character: any): boolean {
    return this.favorites.some(fav => fav.id === character.id);
  }

  getFavoriteCount(): number {
    return this.favorites.length;
  }

  getFavorites(): any[] {
    return this.favorites;
  }
}
