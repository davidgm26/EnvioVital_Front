import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductorFormComponent } from './conductor-form.component';

describe('ConductorFormComponent', () => {
  let component: ConductorFormComponent;
  let fixture: ComponentFixture<ConductorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConductorFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConductorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
