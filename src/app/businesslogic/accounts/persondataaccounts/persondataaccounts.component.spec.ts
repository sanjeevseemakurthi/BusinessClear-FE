import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersondataaccountsComponent } from './persondataaccounts.component';

describe('PersondataaccountsComponent', () => {
  let component: PersondataaccountsComponent;
  let fixture: ComponentFixture<PersondataaccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersondataaccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersondataaccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
