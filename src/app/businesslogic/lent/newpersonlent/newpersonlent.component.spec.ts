import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpersonlentComponent } from './newpersonlent.component';

describe('NewpersonlentComponent', () => {
  let component: NewpersonlentComponent;
  let fixture: ComponentFixture<NewpersonlentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewpersonlentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewpersonlentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
