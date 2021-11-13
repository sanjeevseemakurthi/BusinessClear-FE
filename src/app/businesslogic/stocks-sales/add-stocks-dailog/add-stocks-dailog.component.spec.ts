import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStocksDailogComponent } from './add-stocks-dailog.component';

describe('AddStocksDailogComponent', () => {
  let component: AddStocksDailogComponent;
  let fixture: ComponentFixture<AddStocksDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStocksDailogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStocksDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
