import { Injectable } from '@angular/core';
import { CharacterInterface } from '../interceptors/character.interface';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favorites: CharacterInterface[] = [];

  addFavorite(character: CharacterInterface): void {
    if (!this.isFavorite(character)) {
      this.favorites.push(character);
    }
  }

  removeFavorite(character: CharacterInterface): void {
    this.favorites = this.favorites.filter(fav => fav.id !== character.id);
  }

  isFavorite(character: CharacterInterface): boolean {
    return this.favorites.some(fav => fav.id === character.id);
  }

  getFavoriteCount(): number {
    return this.favorites.length;
  }
}
