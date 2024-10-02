
import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SearchComponent } from '../../shared/components/search/search.component';
import { CardListComponent } from '../../shared/components/card-list/card-list.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    SearchComponent,
    CardListComponent,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  searchTerm: string = '';
  selectedView: 'home' | 'favorites' = 'home';
  favoriteCount: number = 0;


  onSearchTermChange(term: string): void {
    this.searchTerm = term;
  }

  onViewChange(view: 'home' | 'favorites') {
    this.selectedView = view;
  }

  updateFavoriteCount(count: number): void {
    this.favoriteCount = count; // Atualiza a contagem de favoritos
  }

}
