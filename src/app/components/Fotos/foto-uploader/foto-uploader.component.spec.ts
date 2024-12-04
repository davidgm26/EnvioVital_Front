import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoUploaderComponent } from './foto-uploader.component';

describe('FotoUploaderComponent', () => {
  let component: FotoUploaderComponent;
  let fixture: ComponentFixture<FotoUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FotoUploaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FotoUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
