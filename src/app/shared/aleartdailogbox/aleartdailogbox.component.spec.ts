import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AleartdailogboxComponent } from './aleartdailogbox.component';

describe('AleartdailogboxComponent', () => {
  let component: AleartdailogboxComponent;
  let fixture: ComponentFixture<AleartdailogboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AleartdailogboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AleartdailogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
