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
    if (term.trim() !== '') {
      this.searchTerm = term;
    }
  }

  onViewChange(view: string): void {
    if (view === 'home' || view === 'favorites') {
      this.selectedView = view;
    }
  }

  updateFavoriteCount(count: number): void {
    if (isNaN(count) || count < 0) {
      this.favoriteCount = 0;
    } else {
      this.favoriteCount = count;
    }
  }
}
