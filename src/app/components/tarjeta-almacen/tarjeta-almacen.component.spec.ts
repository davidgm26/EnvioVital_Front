import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaAlmacenComponent } from './tarjeta-almacen.component';

describe('TarjetaAlmacenComponent', () => {
  let component: TarjetaAlmacenComponent;
  let fixture: ComponentFixture<TarjetaAlmacenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaAlmacenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetaAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
