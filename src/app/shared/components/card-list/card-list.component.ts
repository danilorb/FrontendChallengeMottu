import { Component, Input, OnInit } from '@angular/core';
import { CharacterService } from '../../../core/services/character-service.service';
import {  NgFor } from '@angular/common';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  providers:[CharacterService],
  standalone: true,
  imports: [NgFor]
})
export class CardListComponent implements OnInit {
  characters: any[] = [];
  page: number = 1;
  @Input() searchTerm: string = '';


  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards() {
    this.characterService.getCharacters(this.page).subscribe((data) => {
      this.characters = data.results;
    });
  }

  get filteredCharacters() {
    return this.characters.filter(character =>
      character.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
