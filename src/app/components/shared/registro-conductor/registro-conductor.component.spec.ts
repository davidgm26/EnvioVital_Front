import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroConductorComponent } from './registro-conductor.component';

describe('RegistroConductorComponent', () => {
  let component: RegistroConductorComponent;
  let fixture: ComponentFixture<RegistroConductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroConductorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
