import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAlmacenComponent } from './editar-almacen.component';

describe('EditarAlmacenComponent', () => {
  let component: EditarAlmacenComponent;
  let fixture: ComponentFixture<EditarAlmacenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarAlmacenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
