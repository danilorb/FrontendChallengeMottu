import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    NgOptimizedImage,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Input() isFavorite: boolean = false;
  @Output() searchTermChange: EventEmitter<string> = new EventEmitter<string>();

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTermChange.emit(input.value);
  }
}
