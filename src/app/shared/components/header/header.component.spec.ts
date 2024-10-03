import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, MatButtonToggleModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it(`Deve ter 'favoriteCount' inicializado como 0`, () => {
    expect(component.favoriteCount).toEqual(0);
  });

  it(`Deve atualizar 'favoriteCount' quando um novo valor é atribuído`, () => {
    component.favoriteCount = 5;
    expect(component.favoriteCount).toEqual(5);
  });

  it('Deve emitir o evento viewChange quando onToggleChange é chamado', () => {
    const spy = jest.spyOn(component.viewChange, 'emit');
    component.onToggleChange('favorites');
    expect(spy).toHaveBeenCalledWith('favorites');
  });

  it('Deve definir o selectedView como "home" por padrão', () => {
    expect(component.selectedView).toBe('home');
  });

  it('Deve atualizar o selectedView ao chamar onToggleChange', () => {
    component.onToggleChange('favorites');
    expect(component.selectedView).toBe('favorites');
  });
});
