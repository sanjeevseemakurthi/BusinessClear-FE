import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpersonfinanceComponent } from './newpersonfinance.component';

describe('NewpersonfinanceComponent', () => {
  let component: NewpersonfinanceComponent;
  let fixture: ComponentFixture<NewpersonfinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewpersonfinanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewpersonfinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
