import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { comparerResolver } from './comparer.resolver';

describe('comparerResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => comparerResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
