import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersondetailslentComponent } from './persondetailslent.component';

describe('PersondetailslentComponent', () => {
  let component: PersondetailslentComponent;
  let fixture: ComponentFixture<PersondetailslentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersondetailslentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersondetailslentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
