import { render } from '@testing-library/angular';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';

describe('AppComponent', () => {
  it('should create the component', async () => {
    const component = await render(AppComponent); // Renderiza o componente
    expect(component).toBeTruthy(); // Verifica se o componente foi criado com sucesso
  });

  it('should have the title set to "frontend-challenge-mottu"', async () => {
    const { fixture } = await render(AppComponent); // Renderiza o componente
    const componentInstance = fixture.componentInstance;
    expect(componentInstance.title).toBe('frontend-challenge-mottu'); // Verifica se o título está correto
  });

  it('should render router-outlet', async () => {
    const { container } = await render(AppComponent); // Renderiza o componente
    const routerOutlet = container.querySelector('router-outlet');
    expect(routerOutlet).not.toBeNull(); // Verifica se o RouterOutlet foi renderizado
  });
});
