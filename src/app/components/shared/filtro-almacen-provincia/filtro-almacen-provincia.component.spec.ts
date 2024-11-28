import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroAlmacenProvinciaComponent } from './filtro-almacen-provincia.component';

describe('FiltroAlmacenProvinciaComponent', () => {
  let component: FiltroAlmacenProvinciaComponent;
  let fixture: ComponentFixture<FiltroAlmacenProvinciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroAlmacenProvinciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroAlmacenProvinciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
