import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksSalesComponent } from './stocks-sales.component';

describe('StocksSalesComponent', () => {
  let component: StocksSalesComponent;
  let fixture: ComponentFixture<StocksSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StocksSalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
