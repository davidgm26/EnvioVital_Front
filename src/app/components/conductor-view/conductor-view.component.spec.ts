import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductorViewComponent } from './conductor-view.component';

describe('ConductorViewComponent', () => {
  let component: ConductorViewComponent;
  let fixture: ComponentFixture<ConductorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConductorViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConductorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
