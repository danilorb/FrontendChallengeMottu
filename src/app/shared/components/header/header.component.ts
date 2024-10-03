import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatIconModule,
    MatButtonToggleModule,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() favoriteCount: number = 0;
  @Output() viewChange = new EventEmitter<'home' | 'favorites'>();
  selectedView: string = 'home';

  hideSingleSelectionIndicator = signal(true);

  // Manipula a mudança de seleção de visualização
  onToggleChange(view: 'home' | 'favorites') {
    this.selectedView = view;
    this.viewChange.emit(view);
  }
}
