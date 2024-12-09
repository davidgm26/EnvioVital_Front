import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenViewComponent } from './almacen-view.component';

describe('AlmacenViewComponent', () => {
  let component: AlmacenViewComponent;
  let fixture: ComponentFixture<AlmacenViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlmacenViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlmacenViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
