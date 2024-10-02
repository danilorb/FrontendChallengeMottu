import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CharacterService } from '../../../core/services/character.service';
import { FavoriteService } from '../../../core/services/favorite.service';
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  providers: [CharacterService],
  standalone: true,
  imports: [NgFor, NgIf, MatIconModule],
})
export class CardListComponent {
  characters: any[] = [];
  page: number = 1;
  @Input() searchTerm: string = '';  // Termo de busca para filtrar personagens
  @Input() isFavorite: boolean = false;  // Indica se está no modo favoritos
  @Output() favoriteCountChange = new EventEmitter<number>();  // Emite mudanças na contagem de favoritos

  constructor(
    private characterService: CharacterService,
    public favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.loadCards();  // Carrega os personagens ao iniciar o componente
  }

  // Carrega os personagens e emite a contagem de favoritos
  loadCards(): void {
    this.characterService.getCharacters(this.page).subscribe((data) => {
      this.characters = data.results;
      this.emitFavoriteCount();  // Atualiza a contagem de favoritos
    });
  }

  // Retorna a lista filtrada de personagens, considerando o termo de busca e o modo de favoritos
  get filteredCharacters(): any[] {
    let filtered = this.characters.filter((character) =>
      character.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    if (this.isFavorite) {
      filtered = filtered.filter((character) =>
        this.favoriteService.isFavorite(character)
      );
    }

    return filtered;
  }

  // Adiciona ou remove um personagem dos favoritos
  toggleFavorite(character: any): void {
    if (this.favoriteService.isFavorite(character)) {
      this.favoriteService.removeFavorite(character);  // Remove dos favoritos
    } else {
      this.favoriteService.addFavorite(character);  // Adiciona aos favoritos
    }
    this.emitFavoriteCount();  // Atualiza a contagem de favoritos ao adicionar/remover
  }

  // Emite o número atual de itens favoritados
  emitFavoriteCount(): void {
    const favoriteCount = this.favoriteService.getFavoriteCount();
    this.favoriteCountChange.emit(favoriteCount);  // Atualiza o header
  }
}
