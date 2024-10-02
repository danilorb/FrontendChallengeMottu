import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CharacterService } from '../../../core/services/character-service.service';
import { NgFor } from '@angular/common';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  providers: [CharacterService],
  standalone: true,
  imports: [NgFor, MessageComponent],
})
export class CardListComponent implements OnInit {
  characters: any[] = [];
  page: number = 1;
  hasResults: boolean = true;
  @Input() searchTerm: string = '';

  constructor(private characterService: CharacterService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards() {
    this.characterService.getCharacters(this.page).subscribe((data) => {
      this.characters = data.results;
      this.checkHasResults();
    });
  }

  checkHasResults() {
    const filtered = this.characters.filter(character =>
      character.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.hasResults = filtered.length > 0;
    this.cdr.detectChanges(); // Força a verificação de mudanças após atualizar hasResults
  }

  get filteredCharacters() {
    return this.characters.filter(character =>
      character.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  ngOnChanges() {
    this.checkHasResults(); // Verifica se há resultados sempre que o searchTerm mudar
  }
}
