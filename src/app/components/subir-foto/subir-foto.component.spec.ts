import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirFotoComponent } from './subir-foto.component';

describe('SubirFotoComponent', () => {
  let component: SubirFotoComponent;
  let fixture: ComponentFixture<SubirFotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubirFotoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
