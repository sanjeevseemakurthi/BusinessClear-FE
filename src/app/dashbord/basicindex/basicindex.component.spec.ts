import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicindexComponent } from './basicindex.component';

describe('BasicindexComponent', () => {
  let component: BasicindexComponent;
  let fixture: ComponentFixture<BasicindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicindexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
