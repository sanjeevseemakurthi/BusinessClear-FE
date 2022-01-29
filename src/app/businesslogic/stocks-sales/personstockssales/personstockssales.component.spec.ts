import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonstockssalesComponent } from './personstockssales.component';

describe('PersonstockssalesComponent', () => {
  let component: PersonstockssalesComponent;
  let fixture: ComponentFixture<PersonstockssalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonstockssalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonstockssalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
