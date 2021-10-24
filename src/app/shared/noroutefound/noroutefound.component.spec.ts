import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoroutefoundComponent } from './noroutefound.component';

describe('NoroutefoundComponent', () => {
  let component: NoroutefoundComponent;
  let fixture: ComponentFixture<NoroutefoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoroutefoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoroutefoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
