import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaConductoresComponent } from './lista-conductores.component';

describe('ListaConductoresComponent', () => {
  let component: ListaConductoresComponent;
  let fixture: ComponentFixture<ListaConductoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaConductoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaConductoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
