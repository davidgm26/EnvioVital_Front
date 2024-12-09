import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAlmacenesRegistradosComponent } from './lista-almacenes-registrados.component';

describe('ListaAlmacenesRegistradosComponent', () => {
  let component: ListaAlmacenesRegistradosComponent;
  let fixture: ComponentFixture<ListaAlmacenesRegistradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAlmacenesRegistradosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAlmacenesRegistradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
