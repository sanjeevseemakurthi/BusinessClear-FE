import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersondetailseditComponent } from './persondetailsedit.component';

describe('PersondetailseditComponent', () => {
  let component: PersondetailseditComponent;
  let fixture: ComponentFixture<PersondetailseditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersondetailseditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersondetailseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
