import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculoFormComponent } from './vehiculo-form.component';

describe('VehiculoFormComponent', () => {
  let component: VehiculoFormComponent;
  let fixture: ComponentFixture<VehiculoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiculoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
