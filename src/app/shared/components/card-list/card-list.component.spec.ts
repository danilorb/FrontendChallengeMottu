import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardListComponent } from './card-list.component';
import { CharacterService } from '../../../core/services/character.service';
import { FavoriteService } from '../../../core/services/favorite.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CharacterInterface } from '../../../core/interceptors/character.interface';

describe('CardListComponent', () => {
  let component: CardListComponent;
  let fixture: ComponentFixture<CardListComponent>;
  let characterService: Partial<Record<keyof CharacterService, jest.Mock>>;
  let favoriteService: Partial<Record<keyof FavoriteService, jest.Mock>>;

  beforeEach(() => {
    characterService = {
      getCharacters: jest.fn().mockReturnValue(of({ results: [] })),
    };

    favoriteService = {
      isFavorite: jest.fn(),
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      getFavoriteCount: jest.fn().mockReturnValue(0),
    };

    TestBed.configureTestingModule({
      imports: [CommonModule, CardListComponent,HttpClientModule],
      providers: [
        { provide: CharacterService, useValue: characterService },
        { provide: FavoriteService, useValue: favoriteService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CardListComponent);
    component = fixture.componentInstance;
  });

  it('Deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deve filtrar personagens com base no termo de busca', () => {
    component.characters = [
      { id: 1, name: 'Superman', species: 'Kryptonian', image: 'superman.jpg' },  // Ajuste conforme necessário
      { id: 2, name: 'Wonder Woman', species: 'Amazon', image: 'wonderwoman.jpg' }, // Ajuste conforme necessário
    ];
    component.searchTerm = 'man';
    expect(component.filteredCharacters.length).toBe(2);
  });

  it('Deve adicionar um personagem aos favoritos', () => {
    const character: CharacterInterface = { id: 1, name: 'Batman', species: 'Human', image: 'batman.jpg' }; // Ajuste conforme necessário
    component.toggleFavorite(character);
    expect(favoriteService.addFavorite).toHaveBeenCalledWith(character);
  });

  it('Deve remover um personagem dos favoritos', () => {
    const character: CharacterInterface = { id: 1, name: 'Batman', species: 'Human', image: 'batman.jpg' }; // Ajuste conforme necessário
    favoriteService.isFavorite = jest.fn().mockReturnValue(true);
    component.toggleFavorite(character);
    expect(favoriteService.removeFavorite).toHaveBeenCalledWith(character);
  });

  it('Deve emitir a contagem de favoritos', () => {
    component.favoriteCountChange.emit = jest.fn();
    component.emitFavoriteCount();
    expect(component.favoriteCountChange.emit).toHaveBeenCalledWith(0);
  });
});
