import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorRolComponent } from './selector-rol.component';

describe('SelectorRolComponent', () => {
  let component: SelectorRolComponent;
  let fixture: ComponentFixture<SelectorRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectorRolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectorRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
