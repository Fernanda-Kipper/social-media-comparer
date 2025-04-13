import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparerComponent } from './comparer.component';

describe('ComparerComponent', () => {
  let component: ComparerComponent;
  let fixture: ComponentFixture<ComparerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
