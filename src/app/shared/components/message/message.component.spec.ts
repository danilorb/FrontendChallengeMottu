import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageComponent } from './message.component';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it(`Deve ter 'title' inicializado como uma string vazia`, () => {
    expect(component.title).toEqual('');
  });

  it(`Deve ter 'description' inicializado como uma string vazia`, () => {
    expect(component.description).toEqual('');
  });

  it(`Deve ter 'buttonText' inicializado como uma string vazia`, () => {
    expect(component.buttonText).toEqual('');
  });

  it(`Deve ter 'showButton' inicializado como false`, () => {
    expect(component.showButton).toBeFalsy();
  });

  it(`Deve atualizar 'title' quando um novo valor é atribuído`, () => {
    component.title = 'Novo Título';
    expect(component.title).toEqual('Novo Título');
  });

  it(`Deve atualizar 'description' quando um novo valor é atribuído`, () => {
    component.description = 'Nova Descrição';
    expect(component.description).toEqual('Nova Descrição');
  });

  it(`Deve atualizar 'buttonText' quando um novo valor é atribuído`, () => {
    component.buttonText = 'Novo Botão';
    expect(component.buttonText).toEqual('Novo Botão');
  });

  it(`Deve atualizar 'showButton' quando um novo valor é atribuído`, () => {
    component.showButton = true;
    expect(component.showButton).toBeTruthy();
  });

  it('Deve chamar onButtonClick quando o botão for clicado', () => {
    // Simular a função do botão clicado
    jest.spyOn(component, 'onButtonClick');

    // Chamar o método
    component.onButtonClick();

    // Verificar se o método foi chamado
    expect(component.onButtonClick).toHaveBeenCalled();
  });
});
