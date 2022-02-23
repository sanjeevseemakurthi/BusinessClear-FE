import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpersonaccountComponent } from './newpersonaccount.component';

describe('NewpersonaccountComponent', () => {
  let component: NewpersonaccountComponent;
  let fixture: ComponentFixture<NewpersonaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewpersonaccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewpersonaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
