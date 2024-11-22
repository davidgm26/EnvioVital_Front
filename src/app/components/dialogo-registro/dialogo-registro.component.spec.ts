import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoRegistroComponent } from './dialogo-registro.component';

describe('DialogoRegistroComponent', () => {
  let component: DialogoRegistroComponent;
  let fixture: ComponentFixture<DialogoRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogoRegistroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogoRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
