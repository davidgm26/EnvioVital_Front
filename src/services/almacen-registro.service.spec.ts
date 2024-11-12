import { TestBed } from '@angular/core/testing';

import { AlmacenRegistroService } from './almacen-registro.service';

describe('AlmacenRegistroService', () => {
  let service: AlmacenRegistroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlmacenRegistroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
