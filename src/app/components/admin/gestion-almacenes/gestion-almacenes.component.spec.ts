import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAlmacenesComponent } from './gestion-almacenes.component';

describe('GestionAlmacenesComponent', () => {
  let component: GestionAlmacenesComponent;
  let fixture: ComponentFixture<GestionAlmacenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionAlmacenesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionAlmacenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
