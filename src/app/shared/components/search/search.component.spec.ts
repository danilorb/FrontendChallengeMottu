import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SearchComponent,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it(`Deve ter 'isFavorite' inicializado como false`, () => {
    expect(component.isFavorite).toBeFalsy();
  });

  it('Deve emitir o evento searchTermChange quando onSearch for chamado', () => {
    // Use jest.spyOn ao invés de apenas spyOn
    jest.spyOn(component.searchTermChange, 'emit');

    const mockEvent = {
      target: {
        value: 'termo de pesquisa',
      },
    } as unknown as Event;

    component.onSearch(mockEvent);
    expect(component.searchTermChange.emit).toHaveBeenCalledWith('termo de pesquisa');
  });

  it('Deve renderizar o campo de entrada corretamente', () => {
    const inputElement = fixture.debugElement.query(By.css('input'));
    expect(inputElement).toBeTruthy();
  });

  it('Deve atualizar o valor do campo de entrada e emitir o valor quando digitado', () => {
    jest.spyOn(component.searchTermChange, 'emit');

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.value = 'novo termo';
    inputElement.dispatchEvent(new Event('input'));

    expect(component.searchTermChange.emit).toHaveBeenCalledWith('novo termo');
  });
});
