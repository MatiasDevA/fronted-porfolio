import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioEducacionComponent } from './formulario-educacion.component';

describe('FormularioEducacionComponent', () => {
  let component: FormularioEducacionComponent;
  let fixture: ComponentFixture<FormularioEducacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioEducacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioEducacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
