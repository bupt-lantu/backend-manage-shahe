import { TestBed } from '@angular/core/testing';

import { PlaceTypeService } from './placetype.service';

describe('PlaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlaceTypeService = TestBed.get(PlaceTypeService);
    expect(service).toBeTruthy();
  });
});
