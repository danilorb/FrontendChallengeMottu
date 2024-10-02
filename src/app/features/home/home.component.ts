
import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SearchComponent } from '../../shared/components/search/search.component';
import { CardListComponent } from '../../shared/components/card-list/card-list.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    SearchComponent,
    CardListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  searchTerm: string = '';

  onSearchTermChange(term: string): void {
    this.searchTerm = term;
  }

}
