import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroEventoProvinciaComponent } from './filtro-evento-provincia.component';

describe('FiltroEventoProvinciaComponent', () => {
  let component: FiltroEventoProvinciaComponent;
  let fixture: ComponentFixture<FiltroEventoProvinciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroEventoProvinciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroEventoProvinciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
