import { NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {ChangeDetectionStrategy, Component,signal } from '@angular/core';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage, MatIconModule, MatButtonToggleModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  selectedValue: string = 'home'; // Valor selecionado padrão
  hideSingleSelectionIndicator = signal(true);

  toggleSelection(value: string) {
    this.selectedValue = value;
    console.log(`${value} button toggled`);

    // Aqui você pode adicionar a lógica específica para cada botão
    if (value === 'favorites') {
      // Lógica para o botão de favoritos
    }
  }
}
