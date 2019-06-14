import { TestBed } from '@angular/core/testing';

import { NgxAceService } from './ngx-ace.service';

describe('NgxAceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxAceService = TestBed.get(NgxAceService);
    expect(service).toBeTruthy();
  });
});
