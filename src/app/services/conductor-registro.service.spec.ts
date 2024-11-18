import { TestBed } from '@angular/core/testing';

import { ConductorRegistroService } from './conductor-registro.service';

describe('ConductorRegistroService', () => {
  let service: ConductorRegistroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConductorRegistroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
