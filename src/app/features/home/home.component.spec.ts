import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SearchComponent } from '../../shared/components/search/search.component';
import { CardListComponent } from '../../shared/components/card-list/card-list.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        HeaderComponent,
        SearchComponent,
        CardListComponent,
        CommonModule,
        HttpClientModule,
        NoopAnimationsModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it(`Deve inicializar 'searchTerm' como uma string vazia`, () => {
    expect(component.searchTerm).toEqual('');
  });

  it(`Deve inicializar 'favoriteCount' como 0`, () => {
    expect(component.favoriteCount).toEqual(0);
  });

  it(`Deve atualizar 'searchTerm' se o novo termo não for vazio`, () => {
    component.onSearchTermChange('novo termo');
    expect(component.searchTerm).toEqual('novo termo');
  });

  it(`Deve manter 'searchTerm' se o novo termo for vazio`, () => {
    component.searchTerm = 'termo atual';
    component.onSearchTermChange('');
    expect(component.searchTerm).toEqual('termo atual');
  });

  it(`Deve não atualizar 'searchTerm' se o novo termo for igual a uma string com espaços`, () => {
    component.searchTerm = 'termo atual';
    component.onSearchTermChange('  '); // Testando uma string com espaços
    expect(component.searchTerm).toEqual('termo atual'); // O valor deve permanecer o mesmo
  });

  it(`Deve inicializar 'selectedView' como 'home'`, () => {
    expect(component.selectedView).toEqual('home');
  });

  it(`Deve alterar 'selectedView' quando onViewChange for chamado`, () => {
    component.onViewChange('favorites');
    expect(component.selectedView).toEqual('favorites');
  });

  it(`Deve não alterar 'selectedView' se o valor não for 'home' ou 'favorites'`, () => {
    const initialView = component.selectedView;
    component.onViewChange('invalid' as any); // Forçando um valor inválido
    expect(component.selectedView).toEqual(initialView); // O valor deve permanecer o mesmo
  });

  it(`Deve não alterar 'selectedView' se o valor for uma string vazia`, () => {
    const initialView = component.selectedView;
    component.onViewChange(''); // Testando string vazia
    expect(component.selectedView).toEqual(initialView); // O valor deve permanecer o mesmo
  });

  it(`Deve atualizar a contagem de favoritos quando updateFavoriteCount for chamado`, () => {
    component.updateFavoriteCount(5);
    expect(component.favoriteCount).toEqual(5);
  });

  it(`Deve atualizar a contagem de favoritos para 0 se o valor for negativo`, () => {
    component.updateFavoriteCount(-5);
    expect(component.favoriteCount).toEqual(0);
  });

  it(`Deve tratar valores NaN`, () => {
    component.updateFavoriteCount(NaN);
    expect(component.favoriteCount).toEqual(0); // O valor deve ser 0 se for NaN
  });

  it(`Deve atualizar a contagem de favoritos para um valor positivo`, () => {
    component.updateFavoriteCount(10);
    expect(component.favoriteCount).toEqual(10); // O valor deve ser atualizado
  });

  it(`Deve atualizar a contagem de favoritos para zero se o valor for zero`, () => {
    component.updateFavoriteCount(0);
    expect(component.favoriteCount).toEqual(0); // O valor deve ser zero
  });

  it(`Deve não atualizar a contagem de favoritos se o valor for indefinido`, () => {
    component.updateFavoriteCount(undefined as any);
    expect(component.favoriteCount).toEqual(0); // O valor deve permanecer 0
  });

  it(`Deve não atualizar a contagem de favoritos se o valor for uma string`, () => {
    component.updateFavoriteCount('string' as any);
    expect(component.favoriteCount).toEqual(0); // O valor deve permanecer 0
  });
});
