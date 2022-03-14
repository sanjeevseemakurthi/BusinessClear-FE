import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfinancedailogueComponent } from './addfinancedailogue.component';

describe('AddfinancedailogueComponent', () => {
  let component: AddfinancedailogueComponent;
  let fixture: ComponentFixture<AddfinancedailogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddfinancedailogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfinancedailogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
