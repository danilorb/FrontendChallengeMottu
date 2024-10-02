import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage, MatIconModule, MatButtonToggleModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() favoriteCount: number = 0;  // Recebe a contagem de favoritos
  @Output() viewChange = new EventEmitter<'home' | 'favorites'>(); // Emissor de evento para mudança de view
  selectedView: string = 'home'; // View selecionada

  hideSingleSelectionIndicator = signal(true);

  // Método para lidar com a mudança de view (home/favorites)
  onToggleChange(view: 'home' | 'favorites') {
    this.viewChange.emit(view);
  }
}
