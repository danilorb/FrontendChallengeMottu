import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CharacterService } from '../../../core/services/character.service';
import { FavoriteService } from '../../../core/services/favorite.service';
import {  CommonModule, NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MessageComponent } from '../message/message.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CharacterInterface } from '../../../core/interceptors/character.interface';
import { trigger, transition, style, animate } from '@angular/animations';
import { SkeletonCardComponent } from '../skeleton-card/skeleton-card.component';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  providers: [CharacterService],
  standalone: true,
  imports: [
    NgFor, NgIf, MatIconModule, MessageComponent,
    InfiniteScrollModule, MatProgressSpinnerModule,
    SkeletonCardComponent
  ],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate(300, style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class CardListComponent {
  characters: CharacterInterface[] = [];
  page: number = 1;
  isSearching: boolean = false;
  isLoading: boolean = false;
  isSKeleton = true;

  @Input() searchTerm: string = '';  // Termo de busca para filtrar personagens
  @Input() isFavorite: boolean = false;  // Indica se está no modo favoritos
  @Output() favoriteCountChange = new EventEmitter<number>();  // Emite mudanças na contagem de favoritos



  constructor(
    private characterService: CharacterService,
    public favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    // Carrega os personagens ao iniciar o componente
    this.loadCards();
  }

  loadCards(): void {
    if (this.isLoading) return; // Previne múltiplos carregamentos simultâneos
    this.isLoading = true;
    this.isSKeleton = true;

    this.characterService.getCharacters(this.page).subscribe((data) => {
      this.characters = [...this.characters, ...data.results]; // Adiciona ao array existente
      this.isLoading = false;
      this.emitFavoriteCount(); // Atualiza a contagem de favoritos
      setTimeout(() => {
        this.isSKeleton = false; // Desativa o skeleton
      }, 2000);
    }, error => {
      console.error('Erro ao carregar personagens:', error);
      this.isLoading = false;
      this.isSKeleton = false; // Desativa o skeleton
    });
  }



  // Retorna a lista filtrada de personagens
  get filteredCharacters(): CharacterInterface[] {
    let filtered = this.characters.filter((character) =>
      character.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    if (this.isFavorite) {
      filtered = filtered.filter((character) =>
        this.favoriteService.isFavorite(character) // Filtra favoritos
      );
    }

    return filtered;
  }

  // Adiciona ou remove um personagem dos favoritos
  toggleFavorite(character: CharacterInterface): void {
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

  // Método chamado quando o usuário atinge o final da lista
  onScrollDown(): void {
    this.page++;
    this.loadCards();  // Carrega mais personagens
  }

  // Método para rastrear itens em uma lista
  trackById(index: number, character: CharacterInterface): number {
    return character.id;  // Retorna o ID do personagem para rastreamento
  }
}
